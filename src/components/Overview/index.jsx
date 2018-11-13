import React, { Component } from 'react';
import { api } from '../../constants';
import UpSetPlot from './UpSet';
import Overlap from '../../models/Overlap';

import '../../assets/styles/overview.css';

class Overview extends Component {
  state = {
    overlaps: [],
    filters: {
      limit: 5,
      start: null,
      end: null,
      interval: null
    }
  };

  componentDidMount() {
    const { filters } = this.state;
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

export default Overview;
