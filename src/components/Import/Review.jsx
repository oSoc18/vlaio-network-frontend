import React from 'react';
import PropTypes from 'prop-types';
import loading from '../../assets/img/loading.gif';

const parseMessage = (response, files) => {
  let errors = null;
  let warnings = null;

  if (!response.warnings) {
    return <React.Fragment><img src={loading} alt="loading animation" /><p>Checken op fouten</p></React.Fragment>;
  }

  if (response.errors && response.errors.length > 0) {
    errors = response.errors.map(element => <li>{element}</li>);
    errors = <React.Fragment><h3>Fouten</h3><ul>{errors}</ul></React.Fragment>;
  } else {
    errors = <React.Fragment><h3>Fouten</h3><ul>Geen fouten gevonden</ul></React.Fragment>;
  }
  if (response.warnings && response.warnings.length > 0) {
    warnings = response.warnings.map(element => <li>{element}</li>);
    warnings = <React.Fragment><h3>Opmerkingen</h3><ul>{warnings}</ul></React.Fragment>;
  } else {
    warnings = <React.Fragment><h3>Opmerkingen</h3><ul>Geen opmerkingen</ul></React.Fragment>;
  }

  return <React.Fragment><h2>{files[0].name}:</h2>{errors}{warnings}</React.Fragment>;
};

const Success = ({
  stepBack, startImport, errorMessage, files
}) => (
  <div>
    <h1>Controleer de data</h1>
    <div>{parseMessage(errorMessage, files)}</div>
    <button className="button import__prev" type="button" onClick={stepBack}>Terug</button>
    <button disabled={!errorMessage.warnings} className="button import__next" type="button" onClick={startImport}>Importeren</button>
  </div>
);

Success.propTypes = {
  stepBack: PropTypes.func.isRequired,
  startImport: PropTypes.func.isRequired,
  errorMessage: PropTypes.instanceOf(Object).isRequired,
  files: PropTypes.arrayOf(Object).isRequired
};

export default Success;
