import styled from 'styled-components';
import { res1 } from 'views/styles';

export const Container = styled.div`
  width: 100%;
`;

export const Details = styled.div`
  display: flex;
  gap: 0px;
  margin-top: 10px;
`;

export const DatesAndDestinations = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 10px;
  @media(max-width: ${res1}) {
    flex-direction: column;
  }
`;
