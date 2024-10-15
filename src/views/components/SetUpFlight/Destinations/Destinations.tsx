import React from 'react';
import { useAppSelector } from 'redux/hooks';
import * as S from './Destinations.styled';
import Location from './Location';
import Destination from './Destination';
import { selectIsDestinationPopperOpen } from '../redux';

const Destinations = () => {
  const isDestinationPopperOpen = useAppSelector(selectIsDestinationPopperOpen);

  return (
    <S.Container>
      <S.InputCont1 isRemove={isDestinationPopperOpen}>
        <Location />
      </S.InputCont1>
      <S.InputCont>
        <Destination />
      </S.InputCont>
    </S.Container>
  );
};

export default Destinations;
