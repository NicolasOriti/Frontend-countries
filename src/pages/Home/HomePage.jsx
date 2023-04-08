import './homePage.css';

import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Navbar } from './../../components/Navbar';

export const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [oldCountries, setOldCountries] = useState([]);
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 10);
    }
  };

  const nextPage = () => {
    const filtered = countries.filter((country) => {
      return country.name.toLowerCase().includes(search.toLowerCase());
    });
    if (currentPage + 10 < filtered.length) {
      console.log('filtered', filtered.length);
      console.log('currentPage', currentPage);
      setCurrentPage(currentPage + 10);
    }
  };

  const filteredCountries = () => {
    if (search.length === 0) {
      return countries.slice(currentPage, currentPage + 10);
    }

    const filtered = countries.filter((country) => {
      return country.name.toLowerCase().includes(search.toLowerCase());
      // brasil.inludes('bra')
    });

    return filtered.slice(currentPage, currentPage + 10);
  };

  const onSearchChange = (event) => {
    setCurrentPage(0);
    setSearch(event.target.value);
  };

  const sortAscByName = () => {
    const sorted = countries.slice().sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
    setCountries(sorted);
    setCurrentPage(0);
  };

  const sortDescByName = () => {
    const sorted = countries.slice().sort((a, b) => {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    });
    setCountries(sorted);
    setCurrentPage(0);
  };

  const sortAscByPop = () => {
    const sorted = countries.slice().sort((a, b) => {
      return a.population - b.population;
    });
    setCountries(sorted);
    setCurrentPage(0);
  };

  const sortDescByPop = () => {
    const sorted = countries.slice().sort((a, b) => {
      return b.population - a.population;
    });
    setCountries(sorted);
    setCurrentPage(0);
  };

  const handleSort = (event) => {
    const value = event.target.value;
    switch (value) {
      case 'ascName':
        sortAscByName();
        break;
      case 'descName':
        sortDescByName();
        break;
      case 'ascPop':
        sortAscByPop();
        break;
      case 'descPop':
        sortDescByPop();
        break;

      default:
        setCountries(oldCountries);
        break;
    }
  };

  const handleFilterContinent = (event) => {
    const value = event.target.value;
    let filtered;
    switch (value) {
      case 'Americas':
        setCurrentPage(0);
        filtered = oldCountries.filter((country) => country.continent === 'Americas');
        setCountries(filtered);
        break;
      case 'Europe':
        setCurrentPage(0);
        filtered = oldCountries.filter((country) => country.continent === 'Europe');
        setCountries(filtered);
        break;
      case 'Asia':
        setCurrentPage(0);
        filtered = oldCountries.filter((country) => country.continent === 'Asia');
        setCountries(filtered);
        break;
      case 'Africa':
        setCurrentPage(0);
        filtered = oldCountries.filter((country) => country.continent === 'Africa');
        setCountries(filtered);
        break;
      case 'Oceania':
        setCurrentPage(0);
        filtered = oldCountries.filter((country) => country.continent === 'Oceania');
        setCountries(filtered);
        break;
      case 'Antarctic':
        setCurrentPage(0);
        filtered = oldCountries.filter((country) => country.continent === 'Antarctic');
        setCountries(filtered);
        break;

      default:
        setCountries(oldCountries);
        break;
    }
  };

  const handleFilterActivity = (event) => {
    const value = event.target.value;
    if (value === 'none') {
      return setCountries(oldCountries);
    }

    const activity = activities.find((activity) => activity.id === Number(value));
    const filtered = oldCountries.filter((country) => {
      return activity.countries.find((countryActivity) => countryActivity.id === country.id);
    });
    setCountries(filtered);
    setCurrentPage(0);
  };

  useEffect(() => {
    fetch('http://localhost:3001/countries')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setOldCountries(data);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/activities')
      .then((response) => response.json())
      .then((data) => {
        setActivities(data);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <input type='text' placeholder='Buscar pais' value={search} onChange={onSearchChange} />

      <label>Filtrar por Continente</label>
      <select onChange={handleFilterContinent}>
        <option value='all'>Todos</option>
        <option value='Americas'>America</option>
        <option value='Europe'>Europa</option>
        <option value='Asia'>Asia</option>
        <option value='Africa'>Africa</option>
        <option value='Oceania'>Oceania</option>
        <option value='Antarctic'>Antarctica</option>
      </select>

      <label>Filtrar por actividad turistica</label>
      <select onChange={handleFilterActivity}>
        <option value='none'>Sin filtrar</option>
        {activities.map((activity) => (
          <option key={activity.id} value={activity.id}>
            {activity.name}
          </option>
        ))}
      </select>

      <label>Ordenamiento</label>
      <select onChange={handleSort}>
        <option value=''>Sin orden</option>
        <option value='ascName'>Ordenar nombre ascendentemente</option>
        <option value='descName'>Ordenar nombre descendentemente</option>
        <option value='ascPop'>Ordenar poblacion ascendentemente</option>
        <option value='descPop'>Ordenar poblacion descendentemente</option>
      </select>
      <div className='countries__container'>
        {filteredCountries().map((country) => (
          <Link to={`/country/${country.id}`} className='country-card' key={country.id}>
            <img src={country.flag} alt={country.name} />
            <h3>{country.name}</h3>
            <p>{country.continent}</p>
          </Link>
        ))}
      </div>

      <button onClick={prevPage}>Anterior</button>
      <button onClick={nextPage}>Siguiente</button>
    </div>
  );
};
