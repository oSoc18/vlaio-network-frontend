import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class CompaniesByPartner extends Component {
  xAxis = null;

  yAxis = null;

  componentDidMount() {
    this.updateAxes();
  }

  componentDidUpdate() {
    this.updateAxes();
  }

  updateAxes = () => {
    const { companiesPerPartner, yScale } = this.props;
    const amounts = Object.keys(companiesPerPartner).map(key => companiesPerPartner[key]);

    const axisScale = d3
      .scaleLinear()
      .domain([d3.min(amounts), d3.max(amounts)])
      .range([this.props.width, 0]);

    const xAxis = d3.axisTop(axisScale);
    if (this.xAxis) d3.select(this.xAxis).call(xAxis);

    const yAxis = d3.axisRight(yScale);
    if (this.yAxis) d3.select(this.yAxis).call(yAxis);
  };

  render() {
    const {
      width, height, yScale, xPos, yPos, companiesPerPartner
    } = this.props;

    const amounts = Object.keys(companiesPerPartner).map(key => companiesPerPartner[key]);

    const xScale = d3
      .scaleLinear()
      .domain([d3.min(amounts), d3.max(amounts)])
      .range([0, width]);

    return (
      <g height={height}>
        <g
          ref={(el) => { this.xAxis = el; }}
          transform={`translate(${xPos}, ${yPos - 20})`}
        />
        <g
          ref={(el) => { this.yAxis = el; }}
          transform={`translate(${width}, ${yPos})`}
          className="company-list"
        />
        <g transform={`translate(${xPos}, ${yPos})`}>
          {Object.keys(companiesPerPartner).map((partner) => {
            const amount = companiesPerPartner[partner];
            return (
              <rect
                key={partner}
                x={(width - xScale(amount)) + xPos}
                y={yScale(partner)}
                width={xScale(amount)}
                height={yScale.bandwidth()}
              />
            );
          })}
        </g>
      </g>
    );
  }
}

CompaniesByPartner.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  yScale: PropTypes.func.isRequired,
  xPos: PropTypes.number.isRequired,
  yPos: PropTypes.number.isRequired,
  companiesPerPartner: PropTypes.objectOf(PropTypes.number).isRequired
};

export default CompaniesByPartner;
