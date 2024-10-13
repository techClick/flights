import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import citiesData from 'views/utils/cities.json';
import Circle from '@mui/icons-material/TripOrigin';
import Location from '@mui/icons-material/LocationOn';
import {
  Box, ClickAwayListener, InputAdornment, Popper,
} from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import { useDispatch } from 'react-redux';
import { selectLocation } from 'views/HomePage/redux';
import * as S from './Destinations.styled';

const Destinations = function Destinations() {
  const location = useAppSelector(selectLocation);
  const [isOpen, setIsOpen] = useState(false);
  const [openTime, setOpenTime] = useState(+new Date());
  const [selectedCity, setSelectedCity] = useState('');
  const citiesOptions = (citiesData as any).filter((city: Record<string, string>) => !selectedCity
    || `${city.name}, ${city.admin1}. ${city.country}`.includes(selectedCity)).map((city: Record<string, string>) => {
    return {
      label: `${city.name}, ${city.admin1}. ${city.country}`,
      admin: `City in ${city.country}`,
      value: city.name,
    };
  }).splice(0, 5);

  const dispatch = useDispatch();

  const onClickCancel = () => {
    setIsOpen(false);
  };

  const onClickAway = () => {
    if (+new Date() > (openTime + 500)) {
      onClickCancel();
    }
  };

  // const onClose = () => {
  //   setIsOpen(false);
  // };

  const PopperComponent = (props: any) => (
    <Popper
      {...props}
      disablePortal
      modifiers={[
        {
          name: 'flip',
          options: {
            fallbackPlacements: [],
          },
        },
        // {
        //   name: 'offset',
        //   options: {
        //     offset: [0, -60],
        //   },
        // },
      ]}
      sx={{ width: '100%' }}
      placement="bottom"
    />
  );

  const onClickCityOption = () => {
  }

  return (
    <S.Container>
      <ClickAwayListener onClickAway={onClickAway}>
        <S.InputCont>
          <Autocomplete
            open={isOpen}
            forcePopupIcon={false}
            onOpen={() => {
              setIsOpen(true);
              setOpenTime(+new Date());
            }}
            disablePortal
            slots={{
              popper: PopperComponent,
            }}
            id="combo-box-demo"
            options={citiesOptions}
            sx={{
              width: isOpen ? '90vw' : '100%',
              maxWidth: isOpen ? '450px' : '100%',
              position: isOpen ? 'absolute' : 'relative',
              overflow: 'visible',
            }}
            onChange={(e, value: any) => {
              setSelectedCity(value?.value || '');
            }}
            // renderTags
            // inputValue={selectedRoom}
            renderOption={(props, option: any) => {
              return (
                <Box sx={{ display: 'flex' }}>
                  <S.City onClick={onClickCityOption}>
                    <Location sx={{ color: '#70757a' }} />
                    <S.CityName>
                      {option.label}
                      <S.CityInfo>{option.admin}</S.CityInfo>
                    </S.CityName>
                  </S.City>
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: isOpen ? '90vw' : '100%',
                  maxWidth: '450px',
                }}
                slotProps={{
                  input: {
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Circle sx={{ scale: '0.8', marginLeft: '10px' }} />
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                }}
              />
            )}
            // isOptionEqualToValue={(l, v) => l.label === v.label}
          />
        </S.InputCont>
      </ClickAwayListener>
    </S.Container>
  );
};

export default Destinations;
