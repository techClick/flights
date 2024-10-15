import React, { useState } from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { convertDate } from 'views/utils/utils';

const CustomDatePicker = function CustomDatePicker({
  value,
  onChange,
  customSx,
  slotProps,
  minDate,
  placeHolder,
} : {
  value: Dayjs | null,
  minDate: Dayjs,
  // eslint-disable-next-line no-unused-vars
  onChange: (d: Dayjs | null) => void,
  customSx: Record<string, any>,
  // eslint-disable-next-line react/require-default-props
  slotProps?: Record<string, any> | undefined,
  placeHolder: string,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const onChangeLocal = (d: Dayjs | null) => {
    setIsOpen(false);
    setTimeout(() => onChange?.(d), 60);
  };

  return (
    <DatePicker
      open={isOpen}
      value={value}
      onChange={onChangeLocal}
      minDate={minDate}
      disableOpenPicker
      sx={{ width: '100%', ...customSx }}
      onClose={() => setIsOpen(false)}
      slotProps={{ ...(slotProps || {}) }}
      slots={{
        textField: (params) => (
          <TextField
            {...params}
            placeholder={placeHolder}
            value={`${convertDate(value?.toDate())}`}
            onClick={() => setIsOpen(true)}
          />
        ),
      }}
    />
  );
};

export default CustomDatePicker;
