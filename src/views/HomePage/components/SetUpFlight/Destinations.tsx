import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import citiesData from 'views/utils/cities.json';
import Circle from '@mui/icons-material/TripOrigin';
import LocationIcon from '@mui/icons-material/LocationOn';
import {
  Box, ClickAwayListener, InputAdornment, Popper,
} from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import { useDispatch } from 'react-redux';
import { Location, selectLocation, setLocation } from 'views/HomePage/redux';
import * as S from './Destinations.styled';

const Destinations = function Destinations() {
  const location = useAppSelector(selectLocation);
  const [isOpen, setIsOpen] = useState(false);
  const [openTime, setOpenTime] = useState(+new Date());
  const [selectedCity, setSelectedCity] = useState('');

  const dispatch = useDispatch();

  const formatCity = (city: Record<string, string>) => `${city.name}, ${city.admin1}. ${city.country}`;
  const citiesOptions = (citiesData as any).filter((city: Record<string, string>) => !selectedCity
    || formatCity(city).toLowerCase().includes(selectedCity.toLowerCase()))
    .map((city: Record<string, string>) => {
      return {
        label: formatCity(city),
        admin: `City in ${city.country}`,
        value: city.name,
        city,
      };
    }).splice(0, 5);

  const onClose = () => {
    setIsOpen(false);
  };

  const onClickAway = () => {
    if (+new Date() > (openTime + 500)) {
      setSelectedCity(location?.name || '');
      onClose();
    }
  };

  const commonSx = {
    width: isOpen ? '200%' : '100%',
    maxWidth: isOpen ? '450px' : '100%',
  };

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
      ]}
      sx={{ ...commonSx }}
      placement="bottom-start"
    />
  );

  const onClickCityOption = (city: Location) => {
    setSelectedCity(city.name);
    dispatch(setLocation(city));
    onClose();
  };

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
              ...commonSx,
              position: isOpen ? 'absolute' : 'relative',
            }}
            onChange={(e, value: any) => {
              setSelectedCity(value?.value || '');
            }}
            // renderTags
            inputValue={selectedCity}
            renderOption={(props, option: any) => {
              return (
                <Box>
                  <S.City onClick={() => onClickCityOption(option.city)}>
                    <LocationIcon sx={{ color: '#70757a' }} />
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
                fullWidth
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
