import React, { useEffect } from 'react';
import Search from '@mui/icons-material/Search';
import { useAppSelector } from 'redux/hooks';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setFetchProgress } from 'views/Layout/redux';
import * as S from './HomePage.styled';
import TopPart from './TopPart/TopPart';
import SetUpFlight from '../components/SetUpFlight/SetUpFlight';
import {
  selectDeparture, selectDestination, selectLocation,
  selectReturnDate,
  selectTripType,
} from './redux';

const HomePage = function HomePage() {
  const location = useAppSelector(selectLocation);
  const destination = useAppSelector(selectDestination);
  const departure = useAppSelector(selectDeparture);
  const returnDate = useAppSelector(selectReturnDate);
  const tripType = useAppSelector(selectTripType);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFetchProgress('fetched'));
  }, []);

  const onClickExplore = () => {
    if (!location) {
      toast('Location is needed', { type: 'warning' });
      return;
    }
    if (!destination) {
      toast('Destination is needed', { type: 'warning' });
      return;
    }
    if (!departure) {
      toast('Departure date is needed', { type: 'warning' });
      return;
    }
    if (tripType === 'Round trip' && !returnDate) {
      toast('Return date is needed', { type: 'warning' });
      return;
    }

    history.push('/explore');
  };

  return (
    <S.Container>
      <TopPart />
      <S.Container2>
        <SetUpFlight />
      </S.Container2>
      <S.Button onClick={onClickExplore}>
        <Search />
        Explore
      </S.Button>
    </S.Container>
  );
};

export default HomePage;
