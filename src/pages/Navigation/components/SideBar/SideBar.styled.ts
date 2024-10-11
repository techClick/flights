import styled from 'styled-components';

export const Container = styled.div<any>`
  background: #022d55;
  width: 148px;
  height: 100%;
  padding: 12px;
  position: ${(props) => props.isMobile && 'absolute'};
  left: 0;
  top: 0;
  -moz-box-sizing: border-box; 
  -webkit-box-sizing: border-box; 
  box-sizing: border-box;
  transform: translateX(${(props) => props.isMobile && '-100%'});
`;
