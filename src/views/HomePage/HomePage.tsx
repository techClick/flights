import React from 'react';
import * as S from './HomePage.styled';
import TopPart from './components/TopPart/TopPart';
import SetUpFlight from './components/SetUpFlight/SetUpFlight';

const HomePage = function HomePage() {
  return (
    <S.Container>
      <TopPart />
      <SetUpFlight />
    </S.Container>
  );
};

export default HomePage;
