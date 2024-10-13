import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 8px;
  width: calc(50% - 8px);
`;

export const InputCont = styled.div`
  width: calc(50% - 5px);
  min-height: 60px;
  z-index: 2;
`;

export const InputCont1 = styled(InputCont)`
  z-index: 1;
`;
