import React, { useState } from 'react';
import citiesData from 'views/utils/cities.json';
import LocationIcon from '@mui/icons-material/LocationOn';
import { useAppSelector } from 'redux/hooks';
import { useDispatch } from 'react-redux';
import { selectIsPopperOpen } from 'views/ExploreResults/redux';
import { formatCity } from 'views/utils/utils';
import {
  LocationType, selectDestination, selectLocation, setDestination,
} from 'views/HomePage/redux';
import SelectLocation from './SelectLocation';

const Destination = () => {
  const destination = useAppSelector(selectDestination);
  const location = useAppSelector(selectLocation);
  const isPopperOpen = useAppSelector(selectIsPopperOpen);
  const [isOpen0, setIsOpen] = useState(false);
  const isOpen = isOpen0 && isPopperOpen;
  const [openTime, setOpenTime] = useState(+new Date());
  const [selectedCity, setSelectedCity] = useState(destination?.name || '');

  const dispatch = useDispatch();

  const citiesOptions = (citiesData as any).filter((city: LocationType) => (!selectedCity
    || formatCity(city).toLowerCase().includes(selectedCity.toLowerCase()))
    && city.id !== location?.id).map((city: LocationType) => {
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
      setSelectedCity(destination?.name || '');
      onClose();
    }
  };

  const onClickCityOption = (city: LocationType) => {
    setSelectedCity(city.name);
    dispatch(setDestination(city));
    onClose();
  };

  return (
    <SelectLocation
      isOpen={isOpen}
      options={citiesOptions}
      onClick={onClickCityOption}
      onClickAway={onClickAway}
      inputIcon={<LocationIcon sx={{ scale: '0.8', marginLeft: '10px' }} />}
      setSelected={setSelectedCity}
      selected={selectedCity}
      onOpen={onOpen}
      placeHolder="Where to?"
    />
  );
};

export default Destination;
