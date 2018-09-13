import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Overlap from '../../../models/Overlap';

const CompaniesByPartner = ({
  width, height, scaleY, xPos, yPos, overlaps
}) => {
  const companiesPerPartner = overlaps.reduce((acc, overlap) => {
    overlap.partners.forEach((partner) => {
      const index = acc.findIndex(arr => arr[0] === partner);
      if (index === -1) acc.push([partner, overlap.amount]);
      else acc[index][1] += overlap.amount;
    });
    return acc;
  }, []);

  return (
    <g />
  );
};

CompaniesByPartner.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  scaleY: PropTypes.func.isRequired,
  xPos: PropTypes.number.isRequired,
  yPos: PropTypes.number.isRequired,
  overlaps: PropTypes.arrayOf(PropTypes.instanceOf(Overlap)).isRequired
};

export default CompaniesByPartner;
