import React from 'react';
import Arrows from '@mui/icons-material/SyncAlt';
import Check from '@mui/icons-material/Check';
import { useAppSelector } from 'redux/hooks';
import {
  CabinClass,
  cabinClasses,
  selectCabinClass,
  selectTripType, setCabinClass, setTripType, Trip, tripTypes,
} from 'views/HomePage/redux';
import { useDispatch } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import { Box, SelectChangeEvent } from '@mui/material';
import * as S from './SetUpFlight.styled';
import SelectOptions from './SelectOptions';
import Occupancy from './Occupancy';
import Dates from './Dates/Dates';
import Destinations from './Destinations/Destinations';

const SetUpFlight = function SetUpFlight() {
  const tripType = useAppSelector(selectTripType);
  const cabinClass = useAppSelector(selectCabinClass);
  const dispatch = useDispatch();

  const tripMenuItems = tripTypes.map((tripT) => (
    <MenuItem value={tripT}>
      <Box sx={{ display: 'flex', gap: '15px', margin: '10px 5px' }}>
        <Check sx={{ visibility: tripT === tripType ? 'visible' : 'hidden' }} />
        {tripT}
      </Box>
    </MenuItem>
  ));

  const cabinClassMenuItems = cabinClasses.map((fClass) => (
    <MenuItem value={fClass}>
      <Box sx={{ display: 'flex', gap: '15px', margin: '10px 5px' }}>
        <Check sx={{ visibility: fClass === cabinClass ? 'visible' : 'hidden' }} />
        {fClass}
      </Box>
    </MenuItem>
  ));

  const tripOnChange = (event: SelectChangeEvent) => {
    dispatch(setTripType(event.target.value as Trip));
  };

  const cabinClassOnChange = (event: SelectChangeEvent) => {
    dispatch(setCabinClass(event.target.value as CabinClass));
  };

  return (
    <S.Container>
      <S.Details>
        <SelectOptions
          icon={<Arrows />}
          value={tripType}
          menuItems={tripMenuItems}
          onChange={tripOnChange}
        />
        <Occupancy />
        <SelectOptions
          value={cabinClass}
          menuItems={cabinClassMenuItems}
          onChange={cabinClassOnChange}
        />
      </S.Details>
      <S.DatesAndDestinations>
        <Destinations />
        <Dates />
      </S.DatesAndDestinations>
    </S.Container>
  );
};

export default SetUpFlight;
