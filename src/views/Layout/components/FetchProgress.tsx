import React, { useEffect, useState } from 'react';
import { useWindowSize } from 'views/hooks';
import * as S from './FetchProgress.styled';

const FetchProgress = ({ fetchProgress } : { fetchProgress: string }) => {
  const [barTranslate, setBarTranslate] = useState(0);
  const [movement, setMovement] = useState<'right' | 'left'>('right');
  const { width: windowWidth } = useWindowSize();

  useEffect(() => {
    setTimeout(() => {
      const newBarTranslate = barTranslate + (movement === 'right' ? 2 : -2);

      const windowMax = (windowWidth || 0) * (66 / 100);
      setBarTranslate(newBarTranslate);
      if (newBarTranslate > (windowMax - 20)) {
        setMovement('left');
      } else if (newBarTranslate <= 5) {
        setMovement('right');
      }
    }, 2);
  }, [barTranslate]);

  return (
    <S.Container fetchProgress={fetchProgress}>
      <S.FetchProgress fetchProgress={fetchProgress} translateX={`${barTranslate}px`} />
    </S.Container>
  );
};

export default FetchProgress;
