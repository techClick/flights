import styled from 'styled-components';

export const topBarColor = '#1685ec';
export const topBarHeight = '30px';

export const RelativeContainer = styled.div<any>`
  height: 100%;
  position: relative;
  width: 100%;
  display: ${(props) => props.flex && 'flex'};
  align-items: ${(props) => props.flex && 'center'};
`;
