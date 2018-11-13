import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { api } from '../../constants';
import UpSetPlot from './UpSet';
import Overlap from '../../models/Overlap';

import '../../assets/styles/overview.css';

class Overview extends Component {
  state = {
    overlaps: []
  };

  componentDidMount() {
    const { activeFilters } = this.props;
    this.fetchOverlaps(activeFilters);
  }

  componentDidUpdate(prevProps) {
    const newActiveFilters = this.props.activeFilters;
    if (JSON.stringify(prevProps.activeFilters) !== JSON.stringify(newActiveFilters)) {
      this.fetchOverlaps(newActiveFilters);
    }
  }

  fetchOverlaps = (filters) => {
    api.overlap.get(filters).then((response) => {
      const overlaps = response.map(o => new Overlap(o)) || [];
      this.setState({ overlaps });
    }).catch(e => console.error(e));
  }

  render() {
    const { overlaps } = this.state;

    return (
      <div className="overview">
        { (overlaps.length === 0) ? (
          <p>No overlaps to show. Check your internet connection.</p>
        ) : (
          <svg className="overview__plot" width="1000" height="940">
            <UpSetPlot
              overlaps={overlaps}
              width={1000}
              height={940}
            />
          </svg>
        )
        }
      </div>
    );
  }
}

Overview.defaultProps = {
  activeFilters: {
    limit: 5
  }
};

Overview.propTypes = {
  activeFilters: PropTypes.shape({
    limit: PropTypes.number,
    types: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    interval: PropTypes.number
  })
};

export default Overview;
