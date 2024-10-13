import React, { SyntheticEvent } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import * as S from './SelectOptions.styled';
import './styles.css';

const SelectOptions = function SelectOptions(
  {
    icon,
    value,
    menuItems = [],
    onChange,
    isOpen,
    onOpen,
  } : {
    // eslint-disable-next-line no-undef, react/require-default-props
    icon?: JSX.Element,
    // eslint-disable-next-line react/require-default-props
    isOpen?: boolean,
    value: string,
    // eslint-disable-next-line no-undef, react/require-default-props
    menuItems?: JSX.Element[],
    // eslint-disable-next-line react/require-default-props, no-unused-vars
    onChange?: (e: SelectChangeEvent<string>) => void,
    // eslint-disable-next-line react/require-default-props, no-unused-vars
    onOpen?: (e: SyntheticEvent<Element, Event>) => void,
  },
) {
  return (
    <S.Container>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        open={isOpen}
        onOpen={onOpen}
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
          minHeight: 0,
          '&:hover': { backgroundColor: '#f0f0f0' },
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
        }}
        MenuProps={{
          disablePortal: true,
          PaperProps: {
            sx: {
              '& .MuiMenuItem-root.Mui-selected': {
                backgroundColor: '#d2e3fc',
              },
              '& .MuiMenuItem-root:hover': {
                backgroundColor: '#f0f0f0',
              },
            },
          },
        }}
        // eslint-disable-next-line no-unused-vars
        onChange={onChange || ((e: SelectChangeEvent<string>) => {})}
      >
        {/* <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
        {menuItems}
      </Select>
    </S.Container>
  );
};

export default SelectOptions;
