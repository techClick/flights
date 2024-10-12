import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import citiesData from 'views/utils/cities.json';
import { Box, ClickAwayListener, Popper } from '@mui/material';
import * as S from './Destinations.styled';

const Destinations = function Destinations() {
  const [isOpen, setIsOpen] = useState(false);
  const [openTime, setOpenTime] = useState<number>(+new Date());
  const citiesOptions = (citiesData as any).map((city: Record<string, string>) => {
    return {
      label: `${city.name}${city.admin1 ? `, ${city.admin1}` : ''}. ${city.country}`,
      value: city.name,
    };
  }).splice(0, 15);

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
            onChange={(e, value) => {
              // setSelectedRoom(value?.label || '');
            }}
            // inputValue={selectedRoom}
            // renderOption={(props, option: any) => {
            //   return (
            //     <Box sx={{ display: 'flex', gap: '10px' }}>
            //       {option.label}
            //     </Box>
            //   );
            // }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: isOpen ? '90vw' : '100%',
                  maxWidth: '450px',
                }}
                onChange={(e) => {
                  // setSelectedRoom(e.target.value);
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
