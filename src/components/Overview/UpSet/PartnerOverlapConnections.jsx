import React from 'react';
import PropTypes from 'prop-types';
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
        allPartners.map(partner => (
          overlaps.map(overlap => (
            <circle
              key={`circle-${overlap.id}`}
              cx={xScale(overlap.partners) + 8}
              cy={yScale(partner) + 12}
              r={xScale.bandwidth() / 1.5}
              fill="lightgray"
            />
          ))
        ))
      }
    </g>
    <g>
      {
        overlaps.map((overlap) => {
          const { partners } = overlap;
          return partners.map((partner, i) => (
            <g key={`${partner}-${overlap.id}`}>
              <circle
                cx={xScale(partners) + 8}
                cy={yScale(partner) + 12}
                r={xScale.bandwidth() / 1.5}
                fill="#000"
              />
              <line
                x1={xScale(partners) + 8}
                x2={xScale(partners) + 8}
                y1={yScale(partner) + 12}
                y2={yScale(partners[i + 1] || partner) + 12}
                className="overlap-connector"
              />
            </g>
          ));
        })
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
