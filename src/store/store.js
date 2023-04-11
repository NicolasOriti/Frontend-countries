import { activitiesSlice } from './slices/activities/activitiesSlice';
import { configureStore } from '@reduxjs/toolkit';
import { countriesSlice } from './slices/countries/countriesSlice';

export const store = configureStore({
  reducer: {
    countries: countriesSlice.reducer,
    activities: activitiesSlice.reducer,
  },
});
