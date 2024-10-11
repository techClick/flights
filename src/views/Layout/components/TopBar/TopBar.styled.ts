import styled from 'styled-components';
import { topBarHeight } from 'views/styles';

export const Container = styled.div`
  background: white;
  height: ${topBarHeight};
  width: 100%;
  display: block;
  padding: 15px;
  border-bottom: 1px solid lightgrey;
  -moz-box-sizing: border-box; 
  -webkit-box-sizing: border-box; 
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

export const Menu = styled.div`
  color: white;
  height: 100%;
  width: 35px;
`;
