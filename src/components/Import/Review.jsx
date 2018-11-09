import React from 'react';
import PropTypes from 'prop-types';

const parseMessage = (response) => {
  let errors = null;
  let warnings = null;


  if (response.errors && response.errors.length > 0) {
    alert("infunction");
    errors = response.errors.map(element => <li>{element} </li>);
    errors = <React.Fragment><h1>Fouten</h1><ul>{errors}</ul></React.Fragment>;
  }
  if (response.warnings && response.warnings.length > 0) {
    warnings = response.warnings.map(element => <li>{element} </li>);
    warnings = <React.Fragment><h1>Opmerkingen</h1><ul>{warnings}</ul></React.Fragment>;
  }

  return <React.Fragment>{errors}{warnings}</React.Fragment>;
};

const Success = ({ stepBack, startImport, errorMessage }) => (
  <div>
    <h1>Controleer de data</h1>
    <div>{parseMessage(errorMessage)}</div>
    <button className="button" type="button" onClick={stepBack}>Terug</button>
    <button className="button" type="button" onClick={startImport}>Importeren</button>
  </div>
);

Success.propTypes = {
  stepBack: PropTypes.func.isRequired,
  startImport: PropTypes.func.isRequired,
  errorMessage: PropTypes.instanceOf(Object).isRequired
};


export default Success;
