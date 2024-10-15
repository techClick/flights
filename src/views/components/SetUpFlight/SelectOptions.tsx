import React, { SyntheticEvent, useRef } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import * as S from './SelectOptions.styled';

const SelectOptions = function SelectOptions(
  {
    icon,
    value,
    menuItems = [],
    onChange,
    isOpen,
    onOpen,
  } : {
    // eslint-disable-next-line no-undef
    icon?: JSX.Element,
    isOpen?: boolean,
    value: string,
    // eslint-disable-next-line no-undef
    menuItems?: JSX.Element[],
    // eslint-disable-next-line no-unused-vars
    onChange?: (e: SelectChangeEvent<string>) => void,
    // eslint-disable-next-line no-unused-vars
    onOpen?: (e: SyntheticEvent<Element, Event>) => void,
  },
) {
  const inputEl = useRef(null);

  return (
    <S.Container>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        open={isOpen}
        onOpen={onOpen}
        ref={inputEl}
        size="small"
        renderValue={(value1) => {
          return (
            <Box sx={{ display: 'flex', gap: '10px' }}>
              {icon || ''}
              {value1}
            </Box>
          );
        }}
        sx={{
          boxShadow: 'none',
          maxWidth: 'calc(33vw - 30px)',
          minHeight: 0,
          '&:hover': { backgroundColor: '#f0f0f0' },
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
        }}
        MenuProps={{
          disablePortal: true,
          disableScrollLock: true,
          PaperProps: {
            sx: {
              // '&.MuiPaper-root': {
              //     position: 'absolute',
              //     top: '0px !important',
              // },
              '& .MuiMenuItem-root.Mui-selected': {
                backgroundColor: '#d2e3fc',
              },
              '& .MuiMenuItem-root:hover': {
                backgroundColor: '#f0f0f0',
              },
            },
          },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          // anchorEl: inputEl.current,
          // anchorReference: 'anchorEl',
        }}
        // eslint-disable-next-line no-unused-vars
        onChange={onChange || ((e: SelectChangeEvent<string>) => {})}
      >
        {menuItems}
      </Select>
    </S.Container>
  );
};

export default SelectOptions;
