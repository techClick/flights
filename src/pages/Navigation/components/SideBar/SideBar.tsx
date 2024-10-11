import React from 'react';
import MediaQuery from 'react-responsive';
import * as S from './SideBar.styled';
import Tabs from './components/Tabs';

const SideBar = function SideBar() {
  return (
    <>
      <MediaQuery minWidth={900}>
        <S.Container isMobile={false} id="sideBar">
          <Tabs />
        </S.Container>
      </MediaQuery>
      <MediaQuery maxWidth={899.9999}>
        <S.Container isMobile id="sideBar">
          <Tabs />
        </S.Container>
      </MediaQuery>
    </>
  );
};

export default SideBar;
