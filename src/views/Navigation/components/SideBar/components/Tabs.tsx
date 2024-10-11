import React, { useState } from 'react';
import * as S from './Tabs.styled';
import { tabOptions } from './utils/utils';
import { moveSideBar } from '../../utils/utils';

const SideBar = function SideBar() {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <>
      {
        tabOptions.map((tab, index) => (
          <S.Tab
            key={`tab${index}`}
            isSelected={index === selectedTab}
            onClick={() => {
              moveSideBar(true);
              setSelectedTab(index);
            }}
          >
            <S.Icon>{tab.icon}</S.Icon>
            {tab.label}
          </S.Tab>
        ))
      }
    </>
  );
};

export default SideBar;