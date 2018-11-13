import React, {Component} from 'react';
import {api} from '../../constants';
import SunburstChart from './Sunburst';

import '../../assets/styles/sunburst.css';

class Sunburst extends Component {
  constructor(){
    super();
    this.state = {
      sunburstData: [],
      sunburstType: 'partner'
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = (type) => {
    api.sunburst.get(type).then((response) => {
      this.setState({ sunburstData: response });
    }).catch(e => console.error(e));
  };

  changeType(type) {
    if (type === this.state.sunburstType) {
      return;
    }
    if (type === 'partner') {
      this.setState({
        sunburstType: 'partner'
      });
      document.getElementById('partnerButton').classList.add('selected');
      document.getElementById('interactionButton').classList.remove('selected');
    } else if (type === 'interaction') {
      this.setState({
        sunburstType: 'interaction'
      });
      document.getElementById('partnerButton').classList.remove('selected');
      document.getElementById('interactionButton').classList.add('selected');
    }
    this.getData((type));
  }

  render() {
    const { sunburstData } = this.state;
    return (
      <div>
        <div>
          <div className="type_button_container">
            <button id="partnerButton" type="button" className="type_button selected" onClick={() => { this.changeType('partner'); }}>Partners
            </button>
          </div>
          <div className="type_button_container">
            <button id="interactionButton" type="button" className="type_button" onClick={() => { this.changeType('interaction'); }}>Interactions</button>
          </div>
        </div>
        <div>
          {(sunburstData.length === 0) ? (
            <p>Er is geen data om weer te geven</p>
          ) : (
            <SunburstChart
              data={sunburstData}
              height={700}
              width={700}
            />
          )}
        </div>
      </div>
    );
  }
}


export default Sunburst;
