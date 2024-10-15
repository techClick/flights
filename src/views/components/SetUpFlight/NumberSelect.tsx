import React from 'react';
import Decrease from '@mui/icons-material/Remove';
import Increase from '@mui/icons-material/Add';
import { OccupancyType } from 'views/HomePage/redux';
import * as S from './NumberSelect.styled';

const NumberSelect = function NumberSelect({
  id,
  tmpOccupancies,
  setTmpOccupancies,
} : {
  id: string,
  tmpOccupancies: OccupancyType[],
  // eslint-disable-next-line no-unused-vars
  setTmpOccupancies: (o: OccupancyType[]) => void,
}) {
  const thisOccupancy = tmpOccupancies.find((occ) => occ.info === id);

  if (!thisOccupancy) return null;

  const { count } = thisOccupancy;

  const isDecreaseDisabled = (id === 'adult' && count === 1) ? true : count <= 0;
  const isIncreaseDisabled = false;

  const onClickIncrease = () => {
    if (isIncreaseDisabled) return;

    const newOccupancies = tmpOccupancies.map((occ) => {
      if (occ.info === id) return { ...occ, count: occ.count + 1 };
      return occ;
    });

    setTmpOccupancies(newOccupancies);
  };

  const onClickDecrease = () => {
    if (isDecreaseDisabled) return;

    const newOccupancies = tmpOccupancies.map((occ) => {
      if (occ.info === id) return { ...occ, count: occ.count - 1 };
      return occ;
    });

    setTmpOccupancies(newOccupancies);
  };

  return (
    <S.Container>
      <S.Adjuster isDisabled={isDecreaseDisabled} onClick={onClickDecrease}>
        <Decrease sx={{ scale: '0.8' }} />
      </S.Adjuster>
      <S.Number>{count}</S.Number>
      <S.Adjuster isDisabled={isIncreaseDisabled} onClick={onClickIncrease}>
        <Increase sx={{ scale: '0.8' }} />
      </S.Adjuster>
    </S.Container>
  );
};

export default NumberSelect;
