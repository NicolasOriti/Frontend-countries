import './activitiesFormPage.css';

import { useDispatch, useSelector } from 'react-redux';

import { Navbar } from './../../components/Navbar';
import { addActivity } from '../../store/slices/activities/thunks';
// import { useSelector } from 'react-redux';
import { useState } from 'react';

export const ActivitiesFormPage = () => {
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('1');
  const [duration, setDuration] = useState(0);
  const [season, setSeason] = useState('Primavera');
  const [idCountries, setIdCountries] = useState([]);

  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.countries.countries);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(Number(event.target.value));
  };

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  const handleCountriesChange = (event) => {
    console.log(event.target.value);
    const selectedCountries = idCountries;
    const indexSelected = selectedCountries.findIndex((country) => country === event.target.value);

    if (indexSelected > -1) {
      selectedCountries.splice(indexSelected, 1);
    } else {
      selectedCountries.push(event.target.value);
    }

    setIdCountries(selectedCountries);
    console.log(idCountries);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(addActivity({ name, difficulty, duration, season, idCountries }));
  };

  return (
    <div>
      <Navbar />

      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type='text' value={name} onChange={handleNameChange} />
        </label>

        <br />

        <label>
          Dificultad:
          <select onChange={handleDifficultyChange}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </label>

        <br />

        <label>
          Duracion:
          <input type='text' value={duration} onChange={handleDurationChange} />
        </label>

        <br />

        <label>
          Temporada:
          <select onChange={handleSeasonChange}>
            <option value='Primavera'>Primavera</option>
            <option value='Verano'>Verano</option>
            <option value='Otoño'>Otoño</option>
            <option value='Invierno'>Invierno</option>
          </select>
        </label>

        <br />

        <label>Paises:</label>
        <select
          className='countries-select'
          multiple={true}
          value={idCountries}
          onChange={handleCountriesChange}
        >
          {allCountries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>

        <br />

        <button type='submit'>Crear Actividad turistica</button>
      </form>
    </div>
  );
};
