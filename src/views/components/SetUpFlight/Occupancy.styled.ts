import styled from 'styled-components';

export const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 15px;
`;

export const NamePart = styled.div`
  font-size: 16px;
  letter-spacing: 0.1px;
  line-height: 24px;
  color: #70757a;
  width: 70px;
`;

export const IsError = styled.div<{ isError: boolean }>`
  color: ${({ isError }) => isError && '#d93025'};
`;

export const Name = styled(IsError)`
  font-weight: 400;
`;

export const Info = styled(IsError)`
  font-size: 12px;
  line-height: 1.2;
`;

export const ErrorMessage = styled.div`
  margin-top: 15px;
  color: #d93025;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.2px;
  line-height: 20px;
  display: flex;
  gap: 3px;
  max-width: 210px;
  margin-left: -3px;
`;

export const Buttons = styled.div`
  margin-top: 20px;
  margin-left: auto;
  display: flex;
  width: max-content;
`;

export const Button = styled.div`
  padding: 4px 20px;
  border-radius: 25px;
  cursor: pointer;
  color: #4285f4;
  font-size: 14px;
  font-weight: 500;
  &:hover {
    background: #e8f0fe;
    color: #174ea6;
  }
`;
