import React from 'react';
import * as S from './Layout.styled';
import TopBar from './components/TopBar/TopBar';

// eslint-disable-next-line no-undef
const Layout = function Layout({ children } : { children: JSX.Element }) {
  return (
    <S.Container>
      <TopBar />
      <S.BottomContainer>
        {children}
      </S.BottomContainer>
    </S.Container>
  );
};

export default Layout;
