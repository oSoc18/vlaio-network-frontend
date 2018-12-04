import React from 'react';
import PropTypes from 'prop-types';

const internalServerError = (<div>Een probleem is opgetreden in de server.</div>);
const unknownError = (<div>Onbekende fout.</div>);
const authorityError = (
  <div>U heeft niet de bevoegdheid,
    u bent niet ingelogd of u heeft het bestand al geüpload.
  </div>);

const codeLib = {
  500: internalServerError,
  401: authorityError
};

/**
 * Gets error message based on the response code of the server
 * param code: the status code responded by the server
 */
const getMessage = (code) => {
  if (codeLib[code]) return codeLib[code];

  return unknownError; // code not in dictionary? Return unknown error code message
};
const ResponseMessage = ({ responseCode }) => (
  <div>
    { getMessage(responseCode) }
  </div>
);

ResponseMessage.propTypes = {
  responseCode: PropTypes.number.isRequired
};

export default ResponseMessage;
