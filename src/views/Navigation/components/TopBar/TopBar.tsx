import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import * as S from './TopBar.styled';
import { moveSideBar } from '../utils/utils';

const TopBar = function TopBar() {
  return (
    <S.Container>
      <S.Menu onClick={() => moveSideBar(false)}>
        <FontAwesomeIcon icon={faList} size="2x" />
      </S.Menu>
    </S.Container>
  );
};

export default TopBar;
