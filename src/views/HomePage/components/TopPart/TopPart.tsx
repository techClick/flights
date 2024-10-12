import React from 'react';
import Mountains from 'assets/mountains.jpg';
import * as S from './TopPart.styled';

const TopPart = function TopPart() {
  return (
    <S.Container>
      <S.Image src={Mountains} />
      <S.Flights>Flights</S.Flights>
    </S.Container>
  );
};

export default TopPart;
