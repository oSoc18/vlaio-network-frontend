import React, {Component} from 'react';
import { api } from '../../constants';
import SunburstChart from './SunburstChart';

class Sunburst extends Component {
  state = {
    sunburstData: [],
  };

  componentDidMount() {
    api.sunburst.get().then((response) => {
      this.setState({ sunburstData: response });
    }).catch(e => console.error(e));
  }

  render() {
    const { sunburstData } = this.state;
    if (!sunburstData.length) {
      return null;
    }
    return (
      <SunburstChart
        data={sunburstData}
        height={700}
        width={700}
      />
    );
  }
}


export default Sunburst;
