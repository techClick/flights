import { IResponse } from 'types/types';
import { LocationType } from 'views/HomePage/redux';

export const formatCity = (city: LocationType) => `${city.name}, ${city.admin1}. ${city.country}`;

export const convertTime = (time: Date) => {
  const getTime = (date: Date) => {
    return `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''
    }${date.getMinutes()}`;
  };

  const parts = getTime(time).split(':');
  let suffix = ' AM';
  if (Number(parts[0]) >= 12) {
    suffix = ' PM';
    if (Number(parts[0]) > 12) {
      parts[0] = (Number(parts[0]) - 12).toString();
    }
  }
  if (parts[0].length < 2) {
    parts[0] = `0${parts[0]}`;
  }
  if (parts[1].length < 2) {
    parts[1] = `0${parts[1]}`;
  }
  return `${parts.join(':')}${suffix}`;
};

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

// eslint-disable-next-line no-unused-vars
export const getAPIFlights = async (onProgress: (n: number) => void)
  : Promise<IResponse> => {
  // eslint-disable-next-line implicit-arrow-linebreak, no-new
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('progress', (e) => {
      // console.log(e.loaded, e.total);
      onProgress(e.loaded / (e.total || 500000));
    });
    xhr.addEventListener('load', () => resolve({ status: xhr.status, data: xhr.responseText }));
    xhr.addEventListener('error', () => reject(new Error('failed')));
    xhr.addEventListener('abort', () => reject(new Error('aborted')));
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/photos', true);
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.send();
  });
};
