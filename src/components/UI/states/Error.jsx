import React from 'react';
import PropTypes from 'prop-types';

import defaultGraphic from '../../../assets/img/icon-network-error.png';

import '../../../assets/styles/UI/states.css';

const ErrorState = ({ message, graphic, cta }) => (
  <div className="state">
    <img src={graphic} alt="Error encountered" className="state__graphic" />
    <div className="state__message">
      <p>
        {message}<br />
        {cta}
      </p>
    </div>
  </div>
);

ErrorState.defaultProps = {
  graphic: defaultGraphic
};

ErrorState.propTypes = {
  message: PropTypes.string.isRequired,
  cta: PropTypes.node.isRequired,
  graphic: PropTypes.string
};

export default ErrorState;
