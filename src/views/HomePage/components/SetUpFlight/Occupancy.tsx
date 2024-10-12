import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, ClickAwayListener } from '@mui/material';
import Person from '@mui/icons-material/PersonOutline';
import Error from '@mui/icons-material/ErrorOutline';
import { useAppSelector } from 'redux/hooks';
import { OccupancyType, selectOccupancies, setOccupancies } from 'views/HomePage/redux';
import * as S from './Occupancy.styled';
import SelectOptions from './SelectOptions';
import NumberSelect from './NumberSelect';

const Occupancy = function Occupancy() {
  const occupancies = useAppSelector(selectOccupancies);
  const [previousOccupancies, setPreviousOccupancies] = useState(occupancies);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openTime, setOpenTime] = useState<number>(+new Date());

  const adults = occupancies.find((occ) => occ.name === 'Adults')?.count || 1;
  const infantsOnLap = occupancies.find((occ) => occ.info === 'On lap')?.count || 0;
  const infantsInSeat = occupancies.find((occ) => occ.info === 'In seat')?.count || 0;
  const isInfantOnLapError = (occInfo: OccupancyType['info']) => (occInfo === 'On lap' || occInfo === 'adult')
    && infantsOnLap > adults;
  const isInfantInSeatError = (occInfo: OccupancyType['info']) => (occInfo === 'adult' || occInfo === 'In seat')
    && infantsInSeat > (adults * 2);
  const isInfantError = (occInfo: OccupancyType['info'], count: number) => (occInfo === 'adult' || occInfo === 'On lap'
    || occInfo === 'In seat') && count && (infantsInSeat + infantsOnLap) > (adults * 2);

  const isOccupancyError = (occInfo: OccupancyType['info'], count: number): 'On lap' | 'In seat' | 'Too many' | '' => {
    return isInfantOnLapError(occInfo) ? 'On lap' : isInfantInSeatError(occInfo) ? 'In seat'
      : isInfantError(occInfo, count) ? 'Too many' : '';
  };

  const errorMessages = {
    'Too many': 'You must have at least one adult per two infants.',
    'In seat': 'You must have at least one adult per two infants.',
    'On lap': 'You must have at least one adult per infant on lap.',
    '': '',
  };

  const dispatch = useDispatch();

  const onClickCancel = () => {
    dispatch(setOccupancies(previousOccupancies));
    setIsOpen(false);
  };

  const onClickAway = () => {
    if (+new Date() > (openTime + 500)) {
      onClickCancel();
    }
  };

  const onClickDone = () => {
    setPreviousOccupancies(occupancies);
    setIsOpen(false);
  };

  return (
    <SelectOptions
      icon={<Person />}
      value={previousOccupancies.reduce((a, b) => a + b.count, 0).toString()}
      menuItems={[(
        <ClickAwayListener onClickAway={onClickAway}>
          <Box sx={{ padding: '10px 20px' }}>
            {
              occupancies.map((occ) => {
                const { info, name, count } = occ;

                // console.log(info, isOccupancyError(info, count));
                return (
                  <S.Section key={info || 'adult'}>
                    <S.NamePart>
                      <S.Name isError={!!isOccupancyError(info, count)}>{name}</S.Name>
                      { info !== 'adult' && <S.Info isError={!!isOccupancyError(info, count)}>{info}</S.Info> }
                    </S.NamePart>
                    <NumberSelect id={info} />
                  </S.Section>
                );
              })
            }
            {
              isOccupancyError('adult', adults) ? (
                <S.ErrorMessage>
                  <Error sx={{ scale: '0.7' }} />
                  {errorMessages[isOccupancyError('adult', adults)]}
                </S.ErrorMessage>
              ) : (
                <S.Buttons>
                  <S.Button onClick={onClickCancel}>Cancel</S.Button>
                  <S.Button onClick={onClickDone}>Done</S.Button>
                </S.Buttons>
              )
            }
          </Box>
        </ClickAwayListener>
      )]}
      isOpen={isOpen}
      onOpen={() => {
        setIsOpen(true);
        setOpenTime(+new Date());
      }}
    />
  );
};

export default Occupancy;
