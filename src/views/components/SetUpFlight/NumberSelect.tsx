import React from 'react';
import Decrease from '@mui/icons-material/Remove';
import Increase from '@mui/icons-material/Add';
import { useAppSelector } from 'redux/hooks';
import { selectOccupancies, setOccupancies } from 'views/HomePage/redux';
import { useDispatch } from 'react-redux';
import * as S from './NumberSelect.styled';

const NumberSelect = function NumberSelect({
  id,
} : {
  id: string
}) {
  const occupancies = useAppSelector(selectOccupancies);
  const dispatch = useDispatch();
  const thisOccupancy = occupancies.find((occ) => occ.info === id);

  if (!thisOccupancy) return null;

  const { count } = thisOccupancy;

  const isDecreaseDisabled = (id === 'adult' && count === 1) ? true : count <= 0;
  const isIncreaseDisabled = false;

  const onClickIncrease = () => {
    if (isIncreaseDisabled) return;

    const newOccupancies = occupancies.map((occ) => {
      if (occ.info === id) return { ...occ, count: occ.count + 1 };
      return occ;
    });

    dispatch(setOccupancies(newOccupancies));
  };

  const onClickDecrease = () => {
    if (isDecreaseDisabled) return;

    const newOccupancies = occupancies.map((occ) => {
      if (occ.info === id) return { ...occ, count: occ.count - 1 };
      return occ;
    });

    dispatch(setOccupancies(newOccupancies));
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
