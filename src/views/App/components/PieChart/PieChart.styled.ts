import styled from 'styled-components';

const detailsSize = 300;
export const Container = styled.div<any>`
  width: ${(props) => `${(props.width + detailsSize).toString()}px`};
  height: 400px;
  display: flex;
  background: lightgreen;
`;

export const ChartDetails = styled.div`
  width: 300px;
  height: 100%;
  background: lightgrey;
`;
