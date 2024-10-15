import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Plane from '@mui/icons-material/FlightTakeoff';
import { useDispatch } from 'react-redux';
import {
  defaultOccupancies, setDepature, setDestination, setCabinClass,
  setLocation, setOccupancies, setReturnDate, setTripType,
} from 'views/HomePage/redux';
import * as S from './TopBar.styled';

const TopBar = function TopBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const isHomePage = location.pathname === '/';

  const onClickButton = () => {
    if (isHomePage) {
      dispatch(setLocation(null));
      dispatch(setDepature(null));
      dispatch(setReturnDate(null));
      dispatch(setDestination(null));
      dispatch(setTripType('Round trip'));
      dispatch(setOccupancies(defaultOccupancies));
      dispatch(setCabinClass('Economy'));
      return;
    }

    history.push('/');
  };

  return (
    <S.Container>
      <S.Button onClick={onClickButton}>
        <Plane sx={{ scale: '0.8' }} />
        {isHomePage ? 'Refresh' : 'Home'}
      </S.Button>
    </S.Container>
  );
};

export default TopBar;
