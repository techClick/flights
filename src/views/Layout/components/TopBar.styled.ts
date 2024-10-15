import styled from 'styled-components';
import { topBarHeight } from 'views/styles';

export const Container = styled.div`
  background: white;
  height: ${topBarHeight};
  width: 100%;
  display: block;
  padding: 0px 25px;
  border-bottom: 1px solid lightgrey;
  z-index: 2;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

export const Button = styled.div`
  padding: 10px 20px;
  border-radius: 15px;
  background: #e8f0fe;
  color: #1a73e8;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 15px;
  font-weight: 500;
  width: max-content;
  letter-spacing: 0.2px;
  cursor: pointer;
  &:hover {
    background: #d2e3fc;
  }
`;
