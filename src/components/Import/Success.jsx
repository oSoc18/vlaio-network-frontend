import React from 'react';
import PropTypes from 'prop-types';

const Success = ({ restart }) => (
  <div>
    <button className="button" type="button" onClick={restart}>Nieuwe import beginnen</button>
  </div>
);

Success.propTypes = {
  restart: PropTypes.func.isRequired
};

export default Success;
