const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const getDaysDate = function getDaysDate(datePicked?: Date): string {
  let date = new Date();
  if (datePicked) date = new Date(datePicked);
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};

export const getDateFormat = function getDateFormat(datePicked?: Date): string {
  let date = new Date();
  if (datePicked) date = new Date(datePicked);
  const monthName = monthNames[date.getMonth()];
  return `${monthName} ${date.getDate()}`;
};

export const getDateFormatMobile = function getDateFormatMobile(datePicked?: Date): string {
  let date = new Date();
  if (datePicked) date = new Date(datePicked);
  const monthName = [...monthNames[date.getMonth()]].slice(0, 3).join('');
  return `${monthName} ${date.getDate()}${
    date.getFullYear() !== new Date().getFullYear() ? `${date.getFullYear()}` : ''}`;
};

export const getStorageItem = function getStorageItem(type: string) {
  const savedData: string = localStorage.getItem(type) || '';
  return savedData;
};

export const setStorageItem = function setStorageItem(
  type: string,
  newData: any,
) {
  localStorage.setItem(type, newData);
};

export const removeStorageItem = function removeStorageItem(
  type: string,
) {
  localStorage.removeItem(type);
};

export const getIsToday = function getIsToday(inputDate: Date): boolean {
  inputDate = new Date(inputDate);
  const todaysDate = new Date();
  if (inputDate.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)) {
    return true;
  }
  return false;
};

export const getIsSameDay = function getIsSameDay(date1: Date, date2: Date): boolean {
  date1 = new Date(date1);
  date2 = new Date(date2);
  if (date1.setHours(0, 0, 0, 0) === date2.setHours(0, 0, 0, 0)) {
    return true;
  }
  return false;
};

export const getDateIsOlder = function getDateIsOlder(date1: Date, date2: Date): boolean {
  date1 = new Date(date1);
  date2 = new Date(date2);
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  if (date2 < date1) {
    return true;
  }
  return false;
};

export const getDateIsNewer = function getDateIsNewer(date1: Date, date2: Date): boolean {
  date1 = new Date(date1);
  date2 = new Date(date2);
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  if (date2 > date1) {
    return true;
  }
  return false;
};

export const getIsANumber = function getIsANumber(amount: string | null): boolean {
  if (!amount) return false;
  if (isNaN(Number(amount)) || amount?.includes('-')
    || amount?.includes('+') || amount?.includes('e')) return false;
  return true;
};
