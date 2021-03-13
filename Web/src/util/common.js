import axios from 'axios';
import { IsNullOrUndefined } from 'common';

export const axiosGraphQL = axios.create({
  baseURL: 'http://localhost:4000/graphql',
  /*headers: {
    Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },*/
});

export function generateSemanticUICountryId(countryName) {
  switch (countryName)
  {
    case "SWE": return "se";
    case "DNK": return "dk";
    case "SVN": return "si";
    case "SVK": return "sk";
    case "AUT": return "at";
    default: return countryName.substring(0, 2).toLowerCase()
  }
}

export function formatDecimals(number, decimalPlaces)
{
  if (!IsNullOrUndefined(number) && !isNaN(number))
  {
    return number.toFixed(decimalPlaces)
  }
  return null;
}