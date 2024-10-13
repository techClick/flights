import { LocationType } from 'views/HomePage/redux';

export const formatCity = (city: LocationType) => `${city.name}, ${city.admin1}. ${city.country}`;

export const convertDate = (date: Date | undefined) => {
  if (!date) return '';

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const ret = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}${date.getFullYear() !== (
    new Date()).getFullYear() ? ` ${date.getFullYear()}.` : ''}`;
  return ret;
};

export const isMinDay = (date1: Date, date2: Date) => {
  return date1.getFullYear() <= date2.getFullYear() && date1.getMonth() <= date2.getMonth()
    && date1.getDate() <= date2.getDate();
};
