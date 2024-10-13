import React from 'react';
import {
  Autocomplete, Box, ClickAwayListener, InputAdornment, Popper, TextField,
} from '@mui/material';
import LocationIcon from '@mui/icons-material/LocationOn';
import { LocationType } from 'views/HomePage/redux';
import * as S from './SelectLocation.styled';

const SelectLocation = ({
  onClickAway,
  isOpen,
  onOpen,
  setSelected,
  selected,
  options,
  onClick,
  inputIcon,
  placeHolder,
} : {
  onClickAway: () => void,
  isOpen: boolean,
  onOpen: () => void,
  // eslint-disable-next-line no-unused-vars
  setSelected: (a: string) => void,
  selected: string,
  options: Record<string, string>[],
  // eslint-disable-next-line no-unused-vars
  onClick: (a: LocationType) => void,
  // eslint-disable-next-line no-undef
  inputIcon: JSX.Element,
  placeHolder: string,
}) => {
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
      sx={{
        width: '95vw !important',
        maxWidth: '450px',
        boxShadow: isOpen ? '0 1px 3px 0 rgba(60, 64, 67, .3), 0 4px 8px 3px rgba(60, 64, 67, .15);'
          : 'none',
      }}
      placement="bottom-start"
    />
  );

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Autocomplete
        open={isOpen}
        forcePopupIcon={false}
        onOpen={onOpen}
        disablePortal
        slots={{
          popper: PopperComponent,
        }}
        sx={{
          display: 'flex',
        }}
        id="combo-box-demo"
        options={options}
        onChange={(e, value: any) => {
          setSelected(value?.value || '');
        }}
        // renderTags
        inputValue={selected}
        renderOption={(props, option: any) => {
          return (
            <Box sx={{ display: 'flex' }}>
              <S.City onClick={() => onClick(option.city)}>
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
            placeholder={placeHolder}
            sx={{
              width: isOpen ? '90vw' : '100%',
              maxWidth: isOpen ? '450px' : '100%',
              position: isOpen ? 'absolute' : 'relative',
              display: 'flex',
              background: 'white',
              boxShadow: isOpen ? '0 1px 3px 0 rgba(60, 64, 67, .3), 0 4px 8px 3px rgba(60, 64, 67, .15);'
                : 'none',
            }}
            slotProps={{
              input: {
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    {inputIcon}
                  </InputAdornment>
                ),
              },
            }}
            onChange={(e) => {
              setSelected(e.target.value);
            }}
          />
        )}
      />
    </ClickAwayListener>
  );
};

export default SelectLocation;
