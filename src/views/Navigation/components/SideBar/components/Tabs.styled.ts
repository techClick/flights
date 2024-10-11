import styled from 'styled-components';
import { topBarColor } from '../../../../styles';

export const Icon = styled.div<any>`
  width: 23px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 7px;
  font-weight: 400;
  font-size: 14px;
`;

export const Tab = styled.div<any>`
  width: 100%;
  padding: 8px 3px;
  display: flex;
  align-items: center;
  -moz-box-sizing: border-box; 
  -webkit-box-sizing: border-box; 
  box-sizing: border-box;
  margin: 5px 0;
  color: ${(props) => { return props.isSelected ? topBarColor : 'white'; }};
  font-weight: 400;
  font-size: 15px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    padding: 8px 5px;
    background: #02396d;
  }
`;
