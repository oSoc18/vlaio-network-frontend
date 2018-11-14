import React from 'react';
import PropTypes from 'prop-types';

const Success = ({ stepBack, startImport }) => (
  <div>
    <button className="button" type="button" onClick={stepBack}>Terug</button>
    <button className="button" type="button" onClick={startImport}>Importeren</button>
  </div>
);

Success.propTypes = {
  stepBack: PropTypes.func.isRequired,
  startImport: PropTypes.func.isRequired
};

export default Success;
