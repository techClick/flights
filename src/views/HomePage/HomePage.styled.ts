import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
  width: 95vw;
  max-width: 1000px;
  padding-bottom: 200px;
`;

export const Container2 = styled.div`
  width: 100%;
  border-radius: 8px;
  padding: 8px 16px 48px;
  margin-top: 40px;
  box-shadow: 0 1px 3px 0 rgba(60, 64, 67, .3), 0 4px 8px 3px rgba(60, 64, 67, .15);
`;

export const Button = styled.div`
  margin: auto;
  padding: 10px 20px;
  border-radius: 20px;
  background: #1a73e8;
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 500;
  width: max-content;
  box-shadow: 0 1px 3px 0 rgba(60, 64, 67, .3), 0 4px 8px 3px rgba(60, 64, 67, .15);
  margin-top: -20px;
  letter-spacing: 0.2px;
  cursor: pointer;
  &:hover {
    background: #174ea6;
  }
`;
