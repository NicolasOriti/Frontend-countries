import { Navbar } from './../../components/Navbar';
import { useState } from 'react';

export const ActivitiesFormPage = () => {
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [duration, setDuration] = useState(0);
  const [season, setSeason] = useState('');
  const [idCountries, setIdCountries] = useState([]);

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
    const selectedCountries = idCountries;

    selectedCountries.push(event.target.value);

    setIdCountries(selectedCountries);
    console.log(idCountries);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({ name, difficulty, duration, season, idCountries });
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
        <select multiple={true} value={idCountries} onChange={handleCountriesChange}>
          <option value='ARG'>Argentina</option>
          <option value='BRA'>Brasil</option>
          <option value='CHL'>Chile</option>
          <option value='URY'>Uruguay</option>
        </select>

        <br />

        <button type='submit'>Crear Actividad turistica</button>
      </form>
    </div>
  );
};
