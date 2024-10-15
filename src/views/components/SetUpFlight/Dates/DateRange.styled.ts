import styled from 'styled-components';

export const Arrows = styled.div`
  display: flex;
  align-items: center;
  gap: 0px;
  position: absolute;
  right: 2px;
  top: 0;
  height: calc(100% - 3px);
  margin-top: 1px;
  max-width: max-content;
  z-index: 2;
  background: white;
`;

export const Arrow = styled.div<{ isDisabled?: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  color: ${({ isDisabled }) => isDisabled && 'lightgrey'};
  cursor: ${({ isDisabled }) => !isDisabled && 'pointer'};
  &:hover {
    background: ${({ isDisabled }) => !isDisabled && '#f6f6f6'};
  }
`;

export const SeparatorCont = styled.div`
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  flex: 1;
  min-width: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Separator = styled.div`
  background: lightgrey;
  min-width: 100%;
  height: 30px;
  margin-top: -3px;
`;
