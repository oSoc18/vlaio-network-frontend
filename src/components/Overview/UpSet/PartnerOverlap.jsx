import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Overlap from '../../../models/Overlap';

class PartnerOverlap extends Component {
  yAxis = null;

  componentDidMount() {
    this.updateAxis();
  }

  componentDidUpdate() {
    this.updateAxis();
  }

  updateAxis = () => {
    const { overlaps, height } = this.props;

    const amounts = overlaps.map(overlap => overlap.amount);
    const axisScale = d3
      .scaleLinear()
      .domain([d3.min(amounts), d3.max(amounts)])
      .range([height, 0]);

    const yAxis = d3.axisLeft(axisScale).ticks(6);
    if (this.yAxis) d3.select(this.yAxis).call(yAxis);
  };

  render() {
    const {
      height, width, xPos, yPos, xScale, overlaps
    } = this.props;

    const amounts = overlaps.map(overlap => overlap.amount);
    const yScale = d3
      .scaleLinear()
      .domain([d3.min(amounts), d3.max(amounts)])
      .range([0, height]);

    return (
      <g width={width} height={height}>
        <g
          ref={(el) => { this.yAxis = el; }}
          transform={`translate(${xPos - 20}, ${yPos + 50})`}
        />
        <g transform={`translate(${xPos}, ${yPos})`}>
          {overlaps.map(overlap => (
            <g key={overlap.id}>
              <rect
                x={xScale(overlap.partners)}
                y={height + yPos - yScale(overlap.amount)}
                width={xScale.bandwidth()}
                height={yScale(overlap.amount)}
              />
              <text
                x={xScale(overlap.partners) + xScale.bandwidth() / 2}
                y={height - yScale(overlap.amount) + 30}
                className="overlap-amount-label"
              >
                {overlap.amount}
              </text>
            </g>
          ))}
        </g>
      </g>
    );
  }
}

PartnerOverlap.propTypes = {
  xScale: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  xPos: PropTypes.number.isRequired,
  yPos: PropTypes.number.isRequired,
  overlaps: PropTypes.arrayOf(PropTypes.instanceOf(Overlap)).isRequired
};

export default PartnerOverlap;
