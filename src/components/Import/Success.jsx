import React from 'react';
import PropTypes from 'prop-types';
import loading from '../../assets/img/loading.gif';
import responseMessage from './errors';

const generateList = listFiles => listFiles.map(el => <li>{el.name}</li>);
const generateContent = (done, files, restart) => {
  if (done >= 200 && done < 300) {
    return (
      <React.Fragment>
        <h1>Succes!</h1>
        <p>Deze bestanden zijn succesvol geïmporteerd:</p>
        {generateList(files)}
        <button className="button" type="button" onClick={restart}>Nieuwe import beginnen</button>
      </React.Fragment>);
  }
  if (done > 0) { // if there is a responseCode
    return (<responseMessage responseCode={done} />);
  }
  return (
    <React.Fragment>
      <img src={loading} alt="loading animation" />
      <p>Importeren van bestand</p>
    </React.Fragment>
  );
};

const Success = ({ restart, files, importingDone }) => (
  <div>
    { generateContent(importingDone, files, restart) }
  </div>
);

Success.propTypes = {
  restart: PropTypes.func.isRequired
};

export default Success;
