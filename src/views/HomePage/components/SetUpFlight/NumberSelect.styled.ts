import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Adjuster = styled.div<{ isDisabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ isDisabled }) => isDisabled ? '#ededed' : '#e8f0fe'};
  color: ${({ isDisabled }) => isDisabled ? '#cccccc' : '#1a73e8'};
  border-radius: 4px;
  height: 32px;
  width: 32px;
  cursor: ${({ isDisabled }) => !isDisabled && 'pointer'};
`;

export const Number = styled.div`
  display: flex;
  font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 40px;
  font-size: 15px;
  color: #787878;
`;
