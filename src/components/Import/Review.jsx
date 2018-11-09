import React from 'react';
import PropTypes from 'prop-types';
React.Fragment;

function parseMessage(response) {
  let errors = null;

  if (response.errors && response.errors > 0) {
    errors = response.errors.map(element => <li>{element} </li>);
  } else {
    errors = <li>Geen fouten gevonden</li>;
  }
  if (response.warnings && response.warnings > 0) {
      errors = response.warnings.map(element => <li>{element} </li>);
    } else {
      errors = <li>Geen opmerkingen</li>;
    }

  return (

    <div>
      {(response.errors || response.errors > 0) ? (
      <>
        <h1>Fouten</h1>
        <ul>
          { errors }
        </ul>
      </>) : null }


      <h1>Opmerkingen</h1>


    </div>
  );
}

const Success = ({ stepBack, startImport, errorMessage }) => (
  <div>
    <h1>Controleer de data</h1>
    <p>{parseMessage(errorMessage)}</p>
    <button className="button" type="button" onClick={stepBack}>Terug</button>
    <button className="button" type="button" onClick={startImport}>Importeren</button>
  </div>
);

Success.propTypes = {
  stepBack: PropTypes.func.isRequired,
  startImport: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

Success.defaultProps = {
  errorMessage: 'Loading'
};

export default Success;
