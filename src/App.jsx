import './App.css';

import { Route, Switch } from 'react-router-dom';

import { ActivitiesFormPage } from './pages/ActivitiesForm/ActivitiesFormPage';
import { CountryDetailPage } from './pages/CountryDetail/CountryDetailPage';
import { HomePage } from './pages/Home/HomePage';
import { LandingPage } from './pages/Landing/LandingPage';
import { getCountries } from './store/slices/countries/thunks';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route path='/home'>
          <HomePage />
        </Route>

        <Route path='/country/:id'>
          <CountryDetailPage />
        </Route>

        <Route path='/activities'>
          <ActivitiesFormPage />
        </Route>

        <Route path='/'>
          <LandingPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
