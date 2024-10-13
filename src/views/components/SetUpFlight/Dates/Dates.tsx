import React from 'react';
import { useAppSelector } from 'redux/hooks';
import { selectTripType } from 'views/HomePage/redux';
import * as S from './Dates.styled';
import SingleDate from './SingleDate';
import DateRange from './DateRange';

const Dates = function Dates() {
  const tripType = useAppSelector(selectTripType);
  return (
    <S.Container>
      { tripType === 'One way' ? <SingleDate /> : <DateRange /> }
    </S.Container>
  );
};

export default Dates;
