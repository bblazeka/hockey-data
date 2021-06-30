import axios from 'axios';

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export const axiosGraphQL = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_BACKEND_API,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    /*Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`*/
  },
});

export function getDatesArray(startDate, stopDate) {
  var dateArray = [];
  var currentDate = new Date(startDate.getTime());
  var modifiedStopDate = new Date(stopDate.getTime());
  modifiedStopDate.setSeconds(modifiedStopDate.getSeconds() + 50);
  while (currentDate <= modifiedStopDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
}

export function generateSemanticUICountryId(countryName) {
  switch (countryName.toUpperCase())
  {
    case 'SWE': return 'se';
    case 'DNK': return 'dk';
    case 'SVN': return 'si';
    case 'SVK': return 'sk';
    case 'AUT': return 'at';
    case 'BLR': return 'by';
    default: return countryName.substring(0, 2).toLowerCase();
  }
}

export function GetNumberWithOrdinal(n) {
  var s = ['th', 'st', 'nd', 'rd'],
      v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function FormatNumberToCurrency(number)
{
  return formatter.format(number);
}

export function IsNullOrUndefined (obj)  {
  return obj === null || obj === undefined;
}

export function FormatDecimals(number, decimalPlaces)
{
  if (!IsNullOrUndefined(number) && !isNaN(number))
  {
    return number.toFixed(decimalPlaces);
  }
  return null;
}

export function DateToServerFormat(date) {
  if (typeof(date)==='string')
  {
    date = new Date(date);
  }
  // Get the day as a number (1-31)
  var day = (date.getDate() + 0);
  // Get the month as a number (0-11)
  var month = (date.getMonth() + 1);
  return date.getFullYear() + '-' + (month <= 9 ? '0' + month : month) + '-' + (day <= 9 ? '0' + day : day);
}

export function GetMapboxApi()
{
  // eslint-disable-next-line no-undef
  return process.env.REACT_APP_MAP_API;
}

export function GetCompetitionStageFullName(shortcut) {
  switch (shortcut)
  {
    case 'R': return 'Regular season';
    case 'P': return 'Playoffs';
    default: return shortcut;
  }
}