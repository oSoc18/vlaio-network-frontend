import React from 'react';
import PropTypes from 'prop-types';

import defaultGraphic from '../../../assets/img/icon-bar-chart.png';

import '../../../assets/styles/UI/states.css';

const EmptyState = ({ message, graphic, cta }) => (
  <div className="state">
    <img src={graphic} alt="Nothing to show" className="state__graphic" />
    <div className="state__message">
      <p>
        {message}<br />
        {cta}
      </p>
    </div>
  </div>
);

EmptyState.defaultProps = {
  graphic: defaultGraphic,
  cta: <span />
};

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
  cta: PropTypes.node,
  graphic: PropTypes.string
};

export default EmptyState;
