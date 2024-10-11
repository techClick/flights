import styled from 'styled-components';
import { topBarHeight, topBarColor } from 'views/styles';

export const Container = styled.div`
  background: ${topBarColor};
  height: ${topBarHeight};
  width: 100%;
  display: block;
  padding: 15px;
  -moz-box-sizing: border-box; 
  -webkit-box-sizing: border-box; 
  box-sizing: border-box;
  position: relative;
  z-index: 2;
`;

export const Menu = styled.div`
  color: white;
  height: 100%;
  width: 35px;
`;
