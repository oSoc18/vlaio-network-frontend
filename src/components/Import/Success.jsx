import React from 'react';
import PropTypes from 'prop-types';
import loading from '../../assets/img/loading.gif';
import ResponseMessage from './errors';

const generateList = listFiles => listFiles.map(el => <li>{el.name}</li>);
const generateContent = (done, files, restart) => {
  if (done >= 200 && done < 300) { // success?
    return (
      <React.Fragment>
        <h1>Succes!</h1>
        <p>Dit bestand is succesvol geïmporteerd:</p>
        {generateList(files)}
        <button className="button import__next" type="button" onClick={restart}>Nieuwe import beginnen</button>
      </React.Fragment>);
  }
  if (done > 0) { // if there is a responseCode, and it's not a good one...
    return (
      <React.Fragment>
        <h1>Er is iets misgelopen...</h1>
        <ResponseMessage responseCode={done} />
        <button className="button import__next" type="button" onClick={restart}>
          Nieuwe import beginnen
        </button>
      </React.Fragment>);
  }
  return (
    <React.Fragment>
      <img src={loading} alt="loading animation" />
      <p>Importeren van bestand</p>
    </React.Fragment>
  );
};

/**
 * Success screen of the importing process
 * @param {*} * See Proptypese specification for param types
 */
const Success = ({ restart, files, importingDone }) => (
  <div>
    { generateContent(importingDone, files, restart) }
  </div>
);

Success.propTypes = {
  restart: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(Object).isRequired,
  importingDone: PropTypes.number.isRequired
};

export default Success;
