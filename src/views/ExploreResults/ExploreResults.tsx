import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { setFetchProgress } from 'views/Layout/redux';
import SetUpFlight from 'views/components/SetUpFlight/SetUpFlight';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/hooks';
import {
  selectDeparture, selectDestination, selectLocation, selectReturnDate,
} from 'views/HomePage/redux';
import * as S from './ExploreResults.styled';

const ExploreResults = () => {
  const location = useAppSelector(selectLocation);
  const destination = useAppSelector(selectDestination);
  const departure = useAppSelector(selectDeparture);
  const returnDate = useAppSelector(selectReturnDate);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFetchProgress('15%'));
  }, []);

  if (!location || !destination || !departure || !returnDate) {
    // history.push('/');
    // return null;
  }

  return (
    <S.Container>
      <SetUpFlight />
    </S.Container>
  );
};

export default ExploreResults;
