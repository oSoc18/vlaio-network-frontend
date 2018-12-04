import React from 'react';
import PropTypes from 'prop-types';

import defaultGraphic from '../../../assets/img/icon-file-not-found.png';

import '../../../assets/styles/UI/states.css';

const NotFound = ({ message, graphic, cta }) => (
  <div className="state state--not-found">
    <img src={graphic} alt="Page not found" className="state__graphic" />
    <div className="state__message">
      <p>{message}</p>
      <p>{cta}</p>
    </div>
  </div>
);

NotFound.defaultProps = {
  graphic: defaultGraphic,
  cta: <span />
};

NotFound.propTypes = {
  message: PropTypes.string.isRequired,
  cta: PropTypes.node,
  graphic: PropTypes.string
};

export default NotFound;
