import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { InputAdornment } from '@mui/material';
import ArrowLeft from '@mui/icons-material/ArrowBackIosNew';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';
import Calendar from '@mui/icons-material/CalendarMonthOutlined';
import { useAppSelector } from 'redux/hooks';
import {
  setReturnDate, setDepature, selectDeparture, selectReturnDate,
} from 'views/HomePage/redux';
import { isMinDay } from 'views/utils/utils';
import { useDispatch } from 'react-redux';
import * as S from './DateRange.styled';
import CustomDatePicker from './CustomDatePicker';

const DateRange = () => {
  const departure = useAppSelector(selectDeparture);
  const returnDate = useAppSelector(selectReturnDate);
  const [startDate, setStartDate] = React.useState<Dayjs | null>(departure ? dayjs(departure)
    : null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(returnDate ? dayjs(returnDate) : null);

  const dispatch = useDispatch();

  const isStartArrowLeftDisabled = isMinDay(startDate?.toDate() || new Date(), new Date());
  const isEndArrowLeftDisabled = !endDate || isMinDay(endDate.toDate(), startDate?.toDate()
    || new Date());

  const onEndDateChange = (newDate: Dayjs | null) => {
    setEndDate(newDate);
    dispatch(setReturnDate(newDate?.toDate() || new Date()));
  };

  const onStartDateChange = (newDate: Dayjs | null) => {
    if (endDate && +(newDate?.toDate() || 0) > +endDate.toDate()) {
      onEndDateChange(newDate);
    }
    setStartDate(newDate);
    dispatch(setDepature(newDate?.toDate() || new Date()));
  };

  const onClickStartArrowLeft = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (isStartArrowLeftDisabled) return;

    const date = startDate?.toDate() || new Date();
    date.setHours(date.getHours() - 24);
    onStartDateChange(dayjs(date));
  };

  const onClickStartArrowRight = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!startDate) {
      onStartDateChange(dayjs(new Date()));
      return;
    }

    const date = startDate.toDate();
    date.setHours(date.getHours() + 24);
    onStartDateChange(dayjs(date));
  };

  const onClickEndArrowLeft = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (isEndArrowLeftDisabled) return;

    const date = endDate?.toDate() || new Date();
    date.setHours(date.getHours() - 24);
    onEndDateChange(dayjs(date));
  };

  const onClickEndArrowRight = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!endDate && !startDate) {
      onEndDateChange(dayjs(new Date()));
      return;
    }

    const date = endDate?.toDate() || startDate?.toDate() || new Date();
    date.setHours(date.getHours() + 24);
    onEndDateChange(dayjs(date));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomDatePicker
        value={startDate}
        onChange={onStartDateChange}
        minDate={dayjs(new Date())}
        placeHolder="Depature"
        customSx={{
          width: '55%',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRight: 'none',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              zIndex: 1,
            },
            '&:hover fieldset': {
              border: '1px solid grey',
              zIndex: 2,
            },
          },
        }}
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
                      isDisabled={isStartArrowLeftDisabled}
                      onClick={onClickStartArrowLeft}
                    >
                      <ArrowLeft sx={{ scale: '0.6' }} />
                    </S.Arrow>
                    <S.Arrow onClick={onClickStartArrowRight}>
                      <ArrowForward sx={{ scale: '0.6' }} />
                    </S.Arrow>
                  </S.Arrows>
                </InputAdornment>
              ),
            },
          },
        }}
      />
      <S.SeparatorCont><S.Separator /></S.SeparatorCont>
      <CustomDatePicker
        value={endDate}
        onChange={onEndDateChange}
        minDate={startDate || dayjs(new Date())}
        placeHolder="Return"
        customSx={{
          width: '45%',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderLeft: 'none',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              zIndex: 1,
            },
            '&:hover fieldset': {
              border: '1px solid grey',
              zIndex: 2,
            },
          },
        }}
        slotProps={{
          textField: {
            InputProps: {
              endAdornment: (
                <InputAdornment position="start">
                  <S.Arrows>
                    <S.Arrow
                      isDisabled={isEndArrowLeftDisabled}
                      onClick={onClickEndArrowLeft}
                    >
                      <ArrowLeft sx={{ scale: '0.6' }} />
                    </S.Arrow>
                    <S.Arrow onClick={onClickEndArrowRight}>
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

export default DateRange;
