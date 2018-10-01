import React, { Component } from 'react';
import { api } from '../../constants';
import UpSetPlot from './UpSet';
import Overlap from '../../models/Overlap';

import '../../assets/styles/overview.css';

class Overview extends Component {
  state = {
    overlaps: []
  };

  componentDidMount() {
    api.overlap.get().then((response) => {
      const overlaps = response.map(o => new Overlap(o)) || [];
      this.setState({ overlaps });
    });
  }

  render() {
    const { overlaps } = this.state;
    return (
      <div className="overview">
        <svg className="overview__plot" width="1000" height="940">
          <UpSetPlot
            overlaps={overlaps}
            width={1000}
            height={940}
          />
        </svg>
      </div>
    );
  }
}

export default Overview;
