import React, { Component } from 'react';
import { api } from '../../constants';
import dummydata from './dummy';
import UpSetPlot from './UpSetPlot';

import '../../assets/styles/overview.css';

class Overview extends Component {
  state = {
    overlaps: dummydata
  };

  componentDidMount() {
    // api.overlap.get().then(overlap => console.log(overlap));
  }

  render() {
    const { overlaps } = this.state;
    return (
      <div className="main-content overview">
        <svg className="overview__plot" width="100%" height="">
          <UpSetPlot overlaps={overlaps} />
        </svg>
      </div>
    );
  }
}

export default Overview;
