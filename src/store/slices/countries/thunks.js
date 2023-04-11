import { setCountries } from './countriesSlice';

export const getCountries = () => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:3001/countries');
    const countries = await response.json();
    dispatch(setCountries(countries));
  };
};
