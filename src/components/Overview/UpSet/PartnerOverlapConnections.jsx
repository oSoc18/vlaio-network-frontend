import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Overlap from '../../../models/Overlap';

const PartnerOverlapConnections = ({
  width, height, xPos, yPos, yScale, xScale, overlaps, allPartners
}) => (
  <g
    width={width}
    height={height}
    transform={`translate(${xPos}, ${yPos})`}
  >
    <g>
      {
        allPartners.map((partner, i) => (
          overlaps.map((overlap, j) => (
            <circle
              key={overlap.id}
              cx={xScale(overlap.partners) + 8}
              cy={yScale(partner) + 12}
              r={10}
              fill="lightgray"
            />
          ))
        ))
      }
    </g>
  </g>
);

PartnerOverlapConnections.propTypes = {
  yScale: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  xPos: PropTypes.number.isRequired,
  yPos: PropTypes.number.isRequired,
  overlaps: PropTypes.arrayOf(PropTypes.instanceOf(Overlap)).isRequired,
  allPartners: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default PartnerOverlapConnections;

