import React, { Component } from 'react';
import { api } from '../../constants';
import dummydata from './dummy';
import UpSetPlot from './UpSet';
import Overlap from '../../models/Overlap';

import '../../assets/styles/overview.css';

class Overview extends Component {
  state = {
    overlaps: dummydata.map(data => new Overlap(data))
  };

  componentDidMount() {
    // api.overlap.get().then(overlap => console.log(overlap));
  }

  render() {
    const { overlaps } = this.state;
    return (
      <div className="main-content overview">
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
