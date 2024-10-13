import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 10x;
  width: calc(50% - 5px);
`;

export const InputCont = styled.div`
  width: calc(50% - 5px);
  min-height: 60px;
`;

export const DynamicCont = styled.div<{ isOpen: boolean }>`
  width: ${({ isOpen }) => isOpen ? '200%' : '100%'};
  max-width: ${({ isOpen }) => isOpen ? '450px' : '100%'},
  position: ${({ isOpen }) => isOpen ? 'absolute' : 'relative'}
`;

export const City = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  color: #242527;
  padding: 5px 0px 5px 20px;
  align-items: center;
  padding-right: 20px;
  cursor: default;
  &:hover {
    background: #f0f0f0;
  }
`;

export const CityName = styled.div`
`;

export const CityInfo = styled.div`
  color: grey;
  font-size: 12px;
  font-weight: 100;
`;
