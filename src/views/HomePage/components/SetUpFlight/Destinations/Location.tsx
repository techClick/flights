import React, { useState } from 'react';
import citiesData from 'views/utils/cities.json';
import Circle from '@mui/icons-material/TripOrigin';
import { useAppSelector } from 'redux/hooks';
import { useDispatch } from 'react-redux';
import { formatCity } from 'views/utils/utils';
import {
  LocationType, selectDestination, selectLocation, setLocation,
} from 'views/HomePage/redux';
import SelectLocation from './SelectLocation';

const Location = () => {
  const location = useAppSelector(selectLocation);
  const destination = useAppSelector(selectDestination);
  const [isOpen, setIsOpen] = useState(false);
  const [openTime, setOpenTime] = useState(+new Date());
  const [selectedCity, setSelectedCity] = useState('');

  const dispatch = useDispatch();

  const citiesOptions = (citiesData as any).filter((city: LocationType) => (!selectedCity
    || formatCity(city).toLowerCase().includes(selectedCity.toLowerCase()))
    && city.id !== destination?.id).map((city: LocationType) => {
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

  const onOpen = () => {
    setIsOpen(true);
    setOpenTime(+new Date());
  };

  const onClickAway = () => {
    if (+new Date() > (openTime + 500)) {
      setSelectedCity(location?.name || '');
      onClose();
    }
  };

  const onClickCityOption = (city: LocationType) => {
    setSelectedCity(city.name);
    dispatch(setLocation(city));
    onClose();
  };

  return (
    <SelectLocation
      isOpen={isOpen}
      options={citiesOptions}
      onClick={onClickCityOption}
      onClickAway={onClickAway}
      inputIcon={<Circle sx={{ scale: '0.8', marginLeft: '10px' }} />}
      setSelected={setSelectedCity}
      selected={selectedCity}
      onOpen={onOpen}
      placeHolder="Where from?"
    />
  );
};

export default Location;
