import React from 'react';
import { useAppSelector } from 'redux/hooks';
import * as S from './Layout.styled';
import TopBar from './components/TopBar';
import { selectFetchProgress } from './redux';
import FetchProgress from './components/FetchProgress';

// eslint-disable-next-line no-undef
const Layout = function Layout({ children } : { children: JSX.Element }) {
  const fetchProgress = useAppSelector(selectFetchProgress);

  return (
    <S.Container>
      <S.TopContainer>
        <TopBar />
        <FetchProgress fetchProgress={fetchProgress} />
      </S.TopContainer>
      <S.BottomContainer>
        {children}
      </S.BottomContainer>
    </S.Container>
  );
};

export default Layout;
