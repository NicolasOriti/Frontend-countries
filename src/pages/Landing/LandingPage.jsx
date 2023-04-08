import './landingPage.css';

import { Link } from 'react-router-dom';
import React from 'react';

export const LandingPage = () => {
  return (
    <>
      <div className='landing-container'>
        <img className='landing-image' src='/images/countries.png' alt='countries' />
        <Link className='landing-button' to='/home'>
          Ver Paises
        </Link>
      </div>
    </>
  );
};
