import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 7px;
  margin-top: 20px;
`;

export const Flight = styled.div`
  padding: 18px;
  display: flex;
  border-bottom: 1px solid lightgrey;
`;

export const Cell = styled.div`
  width: 20%;
  flex: 1;
  max-width: 70px;
  padding-right: 15px;
`;

export const Image = styled.img`
  height: 40px;
  width: auto;
`;

export const TimeCell = styled(Cell)`
  max-width: 300px;
  width: 40%;
`;

export const Time = styled.div<{ isFirst?: boolean }>`
  letter-spacing: 0.2px;
  font-weight: 500;
  color: ${({ isFirst }) => isFirst && 'green'};
`;

export const AirportName = styled.div`
  letter-spacing: 0.2px;
  font-weight: 300;
  font-size: 13px;
  color: grey;
  margin-top: 3px;
`;

export const DurationCell = styled(Cell)`
  max-width: 200px;
  @media(max-width: 360px) {
    display: none;
  }
`;

export const Duration = styled.div`
  letter-spacing: 0.2px;
  font-weight: 200;
  color: #373737;
`;

export const StopsCell = styled(Cell)`
  max-width: 80px;
  @media(max-width: 745px) {
    display: none;
  }
`;

export const PriceCell = styled(Cell)`
  max-width: 300px;
  text-align: right;
  padding-right: 0px;
`;
