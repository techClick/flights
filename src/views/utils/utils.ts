import { LocationType } from 'views/HomePage/redux';

export const formatCity = (city: LocationType) => `${city.name}, ${city.admin1}. ${city.country}`;
