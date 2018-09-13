import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import CompaniesByPartner from './CompaniesByPartner';
import PartnerOverlap from './PartnerOverlap';
import PartnerOverlapConnections from './PartnerOverlapConnections';
import Overlap from '../../../models/Overlap';


class UpSetPlot extends Component {
  state = {
    overlaps: [],
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
      overlapWidth: 650
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { overlapWidthScale, overlapHeightScale, dimensions } = prevState;
    const { overlaps } = nextProps;

    dimensions.height = nextProps.height;
    dimensions.width = nextProps.width;

    const allPartners = overlaps.reduce((partners, overlap) => {
      overlap.partners.forEach((partner) => {
        const isKnown = partners.indexOf(partner) !== -1;
        if (!isKnown) partners.push(partner);
      });
      return partners;
    }, []);

    overlaps.sort((o1, o2) => o2.amount - o1.amount);

    overlapWidthScale
      .domain(overlaps.map(o => o.partners))
      .range([0, dimensions.overlapWidth]);
    overlapHeightScale
      .domain(allPartners)
      .range([0, dimensions.companiesByPartnerHeight]);

    return {
      ...prevState, dimensions, overlaps, overlapWidthScale, overlapHeightScale
    };
  }

  render() {
    const {
      overlaps, overlapHeightScale, overlapWidthScale, dimensions
    } = this.state;

    return (
      <g>
        <CompaniesByPartner
          height={dimensions.companiesByPartnerHeight}
          width={300}
          xPos={0}
          yPos={dimensions.height - dimensions.companiesByPartnerHeight + 120}
          scaleY={overlapHeightScale}
          overlaps={overlaps}
        />
        <PartnerOverlap />
        <PartnerOverlapConnections />
      </g>
    );
  }
}

UpSetPlot.propTypes = {
  overlaps: PropTypes.arrayOf(PropTypes.instanceOf(Overlap)).isRequired
};

export default UpSetPlot;
