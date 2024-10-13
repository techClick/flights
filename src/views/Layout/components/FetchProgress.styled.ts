import styled from 'styled-components';

export const Container = styled.div`
  height: 5px;
  min-width: 100%;
`;

export const FetchProgress = styled.div<{ fetchProgress: string }>`
  height: 100%;
  width: ${({ fetchProgress }) => fetchProgress};
  background: #1a73e8;
`;
