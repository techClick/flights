import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { InputAdornment } from '@mui/material';
import ArrowLeft from '@mui/icons-material/ArrowBackIosNew';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';
import Calendar from '@mui/icons-material/CalendarMonthOutlined';
import {
  setReturnDate, setDepature, selectReturnDate, selectDeparture,
} from 'views/HomePage/redux';
import { useAppSelector } from 'redux/hooks';
import { isMinDay } from 'views/utils/utils';
import { useDispatch } from 'react-redux';
import * as S from './DateRange.styled';
import CustomDatePicker from './CustomDatePicker';

const SingleDate = () => {
  const departure = useAppSelector(selectDeparture);
  const returnDate = useAppSelector(selectReturnDate);
  const [startDate, setStartDate] = React.useState<Dayjs | null>(departure ? dayjs(departure)
    : null);

  const dispatch = useDispatch();

  const isArrowLeftDisabled = isMinDay(startDate?.toDate() || new Date(), new Date());

  const onStartDateChange = (newDate: Dayjs | null) => {
    if (returnDate && +(newDate?.toDate() || 0) > +(returnDate || 0)) {
      dispatch(setReturnDate(newDate?.toDate() || new Date()));
    }
    setStartDate(newDate);
    dispatch(setDepature(newDate?.toDate() || new Date()));
  };

  const onClickArrowLeft = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (isArrowLeftDisabled) return;

    const date = startDate?.toDate() || new Date();
    date.setHours(date.getHours() - 24);
    onStartDateChange(dayjs(date));
  };

  const onClickArrowRight = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!startDate) {
      onStartDateChange(dayjs(new Date()));
      return;
    }

    const date = startDate.toDate();
    date.setHours(date.getHours() + 24);
    onStartDateChange(dayjs(date));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomDatePicker
        value={startDate}
        onChange={onStartDateChange}
        minDate={dayjs(new Date())}
        placeHolder="Depature"
        customSx={{}}
        slotProps={{
          textField: {
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">
                  <Calendar />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <S.Arrows>
                    <S.Arrow
                      isDisabled={isArrowLeftDisabled}
                      onClick={onClickArrowLeft}
                    >
                      <ArrowLeft sx={{ scale: '0.6' }} />
                    </S.Arrow>
                    <S.Arrow onClick={onClickArrowRight}>
                      <ArrowForward sx={{ scale: '0.6' }} />
                    </S.Arrow>
                  </S.Arrows>
                </InputAdornment>
              ),
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default SingleDate;
