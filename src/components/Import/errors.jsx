import React from 'react';
import PropTypes from 'prop-types';

const internalServerError = (<div>Een probleem is opgetreden in de server.</div>);
const unknownError = (<div>Onbekende fout.</div>);
const codeLib = {
  500: internalServerError
};
const getMessage = (code) => {
  if (codeLib[code]) return codeLib[code];

  return unknownError;
};
const responseMessage = ({ responseCode }) => (
  <div>
    { getMessage(responseCode) }
  </div>
);

responseMessage.propTypes = {
  responseCode: PropTypes.number.isRequired
};

export default responseMessage;
