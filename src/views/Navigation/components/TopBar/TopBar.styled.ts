import styled from 'styled-components';
import { topBarHeight, topBarColor } from '../../../styles';

export const Container = styled.div`
  background: ${topBarColor};
  height: ${topBarHeight};
  width: 100%;
  display: block;
  padding: 15px;
`;

export const Menu = styled.div`
  color: white;
  height: 100%;
  width: 35px;
`;
