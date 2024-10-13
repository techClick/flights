import React from 'react';
import Arrows from '@mui/icons-material/SyncAlt';
import Check from '@mui/icons-material/Check';
import { useAppSelector } from 'redux/hooks';
import {
  FlightClass,
  flightClasses,
  selectFlightClass,
  selectTripType, setFlightClass, setTripType, Trip, tripTypes,
} from 'views/HomePage/redux';
import { useDispatch } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import { Box, SelectChangeEvent } from '@mui/material';
import * as S from './SetUpFlight.styled';
import SelectOptions from './SelectOptions';
import Occupancy from './Occupancy';
import Dates from './Dates';
import Destinations from './Destinations/Destinations';

const SetUpFlight = function SetUpFlight() {
  const tripType = useAppSelector(selectTripType);
  const flightClass = useAppSelector(selectFlightClass);
  const dispatch = useDispatch();

  const tripMenuItems = tripTypes.map((tripT) => (
    <MenuItem value={tripT}>
      <Box sx={{ display: 'flex', gap: '15px', margin: '10px 5px' }}>
        <Check sx={{ visibility: tripT === tripType ? 'visible' : 'hidden' }} />
        {tripT}
      </Box>
    </MenuItem>
  ));

  const flightClassMenuItems = flightClasses.map((fClass) => (
    <MenuItem value={fClass}>
      <Box sx={{ display: 'flex', gap: '15px', margin: '10px 5px' }}>
        <Check sx={{ visibility: fClass === flightClass ? 'visible' : 'hidden' }} />
        {fClass}
      </Box>
    </MenuItem>
  ));

  const tripOnChange = (event: SelectChangeEvent) => {
    dispatch(setTripType(event.target.value as Trip));
  };

  const flightClassOnChange = (event: SelectChangeEvent) => {
    dispatch(setFlightClass(event.target.value as FlightClass));
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
          value={flightClass}
          menuItems={flightClassMenuItems}
          onChange={flightClassOnChange}
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
