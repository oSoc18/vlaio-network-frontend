import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const UpSetPlot = ({ overlaps }) => {
  console.log(overlaps);
  return (
    <g />
  );
};

UpSetPlot.propTypes = {
  overlaps: PropTypes.arrayOf(PropTypes.shape({
    partners: PropTypes.arrayOf(PropTypes.string),
    amount: PropTypes.number
  })).isRequired
};

export default UpSetPlot;
