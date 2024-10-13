import React from 'react';
import * as S from './FetchProgress.styled';

const FetchProgress = ({ fetchProgress } : { fetchProgress: string }) => {
  return (
    <S.Container>
      <S.FetchProgress fetchProgress={fetchProgress} />
    </S.Container>
  );
};

export default FetchProgress;
