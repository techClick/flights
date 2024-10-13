import React from 'react';
import * as S from './Destinations.styled';
import Location from './Location';
import Destination from './Destination';

const Destinations = () => {
  return (
    <S.Container>
      <S.InputCont>
        <Location />
      </S.InputCont>
      <S.InputCont1>
        <Destination />
      </S.InputCont1>
    </S.Container>
  );
};

export default Destinations;
