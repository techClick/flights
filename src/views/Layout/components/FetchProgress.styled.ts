import styled from 'styled-components';

export const Container = styled.div<{ fetchProgress: string }>`
  height: 3px;
  min-width: 100%;
  background: ${({ fetchProgress }) => fetchProgress === 'fetched' ? 'none' : '#d2e3fc'};
`;

export const FetchProgress = styled.div<{ fetchProgress: string, translateX: string }>`
  height: 100%;
  width: 33vw;
  background: ${({ fetchProgress }) => fetchProgress === 'fetched' ? 'none' : '#1a73e8'};
  transform: ${({ translateX }) => `translateX(${translateX})`};
`;
