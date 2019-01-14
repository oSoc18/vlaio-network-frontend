import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { api } from '../../constants';
import UpSetPlot from './UpSet';
import Overlap from '../../models/Overlap';
import EmptyState from '../UI/states/Empty';
import LoadingState from '../UI/states/Loading';

import '../../assets/styles/overview.css';

class Overview extends Component {
  state = {
    overlaps: [],
    overlapsAreLoading: true
  };

  componentDidMount() {
    const { activeFilters } = this.props;
    this.fetchOverlaps(activeFilters);
  }

  componentDidUpdate(prevProps) {
    const newActiveFilters = this.props.activeFilters;
    if ((JSON.stringify(prevProps.activeFilters) !== JSON.stringify(newActiveFilters))
      && newActiveFilters) {
      this.fetchOverlaps(newActiveFilters);
    }
  }

  fetchOverlaps = (filters) => {
    this.setState({ overlapsAreLoading: true });
    if (!filters.type) delete filters.type;
    api.overlap.get(filters).then((response) => {
      const overlaps = response.map(o => new Overlap(o)) || [];
      this.setState({
        overlaps,
        overlapsAreLoading: false
      });
    }).catch(e => console.error(e));
  }

  render() {
    const { overlaps, overlapsAreLoading } = this.state;
    const { resetFilters } = this.props;

    if (overlapsAreLoading) {
      return (
        <div className="overview">
          <LoadingState />
        </div>
      );
    }

    return (
      <div className="overview">
        { (overlaps.length === 0) ? (
          <EmptyState
            message="Er is geen overlap gekend voor uw geselecteerde filters."
            cta={(
              <Fragment>
                Kies er nieuwe in de zijbalk of&nbsp;
                <button type="button" className="link" onClick={resetFilters}>
                  reset de huidige filters
                </button>
              </Fragment>
            )}
          />
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
    type: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    interval: PropTypes.number
  }),
  resetFilters: PropTypes.func.isRequired
};

export default Overview;
