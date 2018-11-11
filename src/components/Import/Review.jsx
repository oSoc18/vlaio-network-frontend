import React from 'react';
import PropTypes from 'prop-types';
import loading from '../../assets/img/loading.gif';

const parseMessage = (response) => {
  let errors = null;
  let warnings = null;

  if (!response.warnings) {
    return <React.Fragment><img src={loading} alt="loading animation" /><p>Checken op fouten</p></React.Fragment>;
  }

  if (response.errors && response.errors.length > 0) {
    errors = response.errors.map(element => <li>{element}</li>);
    errors = <React.Fragment><h1>Fouten</h1><ul>{errors}</ul></React.Fragment>;
  } else {
    errors = <React.Fragment><h1>Fouten</h1><ul>Geen fouten gevonden</ul></React.Fragment>;
  }
  if (response.warnings && response.warnings.length > 0) {
    warnings = response.warnings.map(element => <li>{element}</li>);
    warnings = <React.Fragment><h1>Opmerkingen</h1><ul>{warnings}</ul></React.Fragment>;
  } else {
    warnings = <React.Fragment><h1>Opmerkingen</h1><ul>Geen opmerkingen</ul></React.Fragment>;
  }

  return <React.Fragment>{errors}{warnings}</React.Fragment>;
};

const Success = ({
  stepBack, startImport, errorMessage
}) => (
  <div>
    <h1>Controleer de data</h1>
    <div>{parseMessage(errorMessage)}</div>
    <button className="button" type="button" onClick={stepBack}>Terug</button>
    <button disabled={!errorMessage.warnings} className="button" type="button" onClick={startImport}>Importeren</button>
  </div>
);

Success.propTypes = {
  stepBack: PropTypes.func.isRequired,
  startImport: PropTypes.func.isRequired,
  errorMessage: PropTypes.instanceOf(Object).isRequired
};

export default Success;
