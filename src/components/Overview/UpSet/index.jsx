import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import CompaniesByPartner from './CompaniesByPartner';
import PartnerOverlap from './PartnerOverlap';
import PartnerOverlapConnections from './PartnerOverlapConnections';
import Overlap from '../../../models/Overlap';

import '../../../assets/styles/upset-plot.css';

class UpSetPlot extends Component {
  state = {
    overlaps: [],
    companiesPerPartner: [],
    overlapWidthScale: d3
      .scaleBand()
      .paddingInner(0.5),
    overlapHeightScale: d3
      .scaleBand()
      .paddingInner(0.5),
    dimensions: {
      height: 0,
      width: 0,
      companiesByPartnerHeight: 250,
      overlapHeight: 500,
      overlapWidth: 600
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { overlapWidthScale, overlapHeightScale, dimensions } = prevState;

    const limit = 20;
    const overlaps = nextProps.overlaps.slice(0, limit);

    dimensions.height = nextProps.height;
    dimensions.width = nextProps.width;

    const allPartners = [];
    const companiesPerPartner = overlaps.reduce((acc, overlap) => {
      overlap.partners.forEach((partner) => {
        acc[partner] = acc[partner] + overlap.amount || overlap.amount;

        const isKnown = allPartners.indexOf(partner) !== -1;
        if (!isKnown) allPartners.push(partner);
      });
      return acc;
    }, {});

    overlaps.sort((o1, o2) => o2.amount - o1.amount);

    overlapWidthScale
      .domain(overlaps.map(o => o.partners))
      .range([0, dimensions.overlapWidth]);
    overlapHeightScale
      .domain(allPartners)
      .range([0, dimensions.companiesByPartnerHeight]);

    return {
      ...prevState, dimensions, overlaps, overlapWidthScale, overlapHeightScale, companiesPerPartner
    };
  }

  render() {
    const {
      overlaps, overlapHeightScale, overlapWidthScale, dimensions, companiesPerPartner
    } = this.state;

    return (
      <g>
        <CompaniesByPartner
          height={dimensions.companiesByPartnerHeight}
          width={300}
          xPos={0}
          yPos={dimensions.height - dimensions.companiesByPartnerHeight - 50}
          yScale={overlapHeightScale}
          companiesPerPartner={companiesPerPartner}
        />
        <PartnerOverlap
          height={dimensions.overlapHeight}
          width={dimensions.overlapWidth}
          xPos={400}
          yPos={40}
          xScale={overlapWidthScale}
          overlaps={overlaps}
        />
        <PartnerOverlapConnections />
      </g>
    );
  }
}

UpSetPlot.propTypes = {
  overlaps: PropTypes.arrayOf(PropTypes.instanceOf(Overlap)).isRequired
};

export default UpSetPlot;
