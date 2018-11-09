import React from 'react';
import PropTypes from 'prop-types';

const generateList = listFiles => listFiles.map(el => <li>{el.name}</li>);

const Success = ({ restart, files }) => (
  <div>
    <h1>Succes!</h1>
    <p>Deze bestanden zijn succesvol geïmporteerd:</p>
    {generateList(files)}
    <button className="button" type="button" onClick={restart}>Nieuwe import beginnen</button>
  </div>
);

Success.propTypes = {
  restart: PropTypes.func.isRequired
};

export default Success;
