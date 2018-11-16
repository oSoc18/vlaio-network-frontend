import React from 'react';
import NotFoundState from '../UI/states/NotFound';

const NotFound = () => (
  <NotFoundState
    message="Deze pagina bestaat niet."
    cta={(
      <button className="button" type="button" onClick={() => { window.location.href = '/'; }}>
        Terug naar de hoofdpagina
      </button>
    )}
  />
);

export default NotFound;
