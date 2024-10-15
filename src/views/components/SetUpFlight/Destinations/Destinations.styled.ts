import styled from 'styled-components';
import { res1 } from 'views/styles';

export const Container = styled.div`
  display: flex;
  gap: 8px;
  flex: 1 0;
  z-index: 2;
`;

export const InputCont = styled.div`
  width: calc(50% - 5px);
  min-height: 60px;
  z-index: 1;
`;

export const InputCont1 = styled(InputCont)<{ isRemove: boolean }>`
  z-index: 2;
  @media(max-width: ${res1}) {
    display: ${({ isRemove }) => isRemove && 'none'};
  }
`;
