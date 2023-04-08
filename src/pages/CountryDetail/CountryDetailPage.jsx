import { useEffect, useState } from 'react';

import { Navbar } from './../../components/Navbar';
import { useParams } from 'react-router-dom';

export const CountryDetailPage = () => {
  const { id } = useParams();

  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/countries/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCountry(data);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1>Country Detail Page</h1>
            {loading ? (
              <h1>Cargando</h1>
            ) : (
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>ID: {country.id}</h5>
                  <h5 className='card-title'>Nombre: {country.name}</h5>
                  <img src={country.flag} alt={country.name} />
                  <h6 className='card-subtitle mb-2 text-muted'>Continente: {country.continent}</h6>
                  <h6 className='card-subtitle mb-2 text-muted'>Capital: {country.capital}</h6>
                  {country.subregion && (
                    <p className='card-text'>Sub region: {country.subregion}</p>
                  )}
                  <p className='card-text'>Area: {country.area}</p>
                  <p className='card-text'>Poblacion: {country.population}</p>

                  {country.activities && (
                    <div>
                      <h3>Actividades</h3>
                      <ul>
                        {country.activities.map((activity) => (
                          <li key={activity.id}>{activity.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
