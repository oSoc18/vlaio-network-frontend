import React, {Component} from 'react';
import {api} from '../../constants';
import SunburstChart from './Sunburst';
import '../../assets/styles/sunburst.css';

class Sunburst extends Component {
  constructor() {
    super();
    this.state = {
      sunburstData: [],
      currentType: 'partner'
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = (type) => {
    api.sunburst.get(type).then((response) => {
      this.setState({sunburstData: response});
    }).catch(e => console.error(e));
  };

  changeType(type) {
    this.setState({currentType: type});
    this.getData((type));
  }

  render() {
    const {sunburstData, currentType} = this.state;
    return (
      <div className="sunburst">
        <div>
          <div className="type_button_container">
            <button
              id="partnerButton"
              type="button"
              className={`type_button${currentType === 'partner' ? ' selected' : ''}`}
              onClick={() => {
                this.changeType('partner');
              }}
            >
              Partners
            </button>
          </div>
          <div className="type_button_container">
            <button
              id="interactionButton"
              type="button"
              className={`type_button${currentType === 'interaction' ? ' selected' : ''}`}
              onClick={() => {
                this.changeType('interaction');
              }}
            >
              Interactions
            </button>
          </div>
        </div>
        <div>
          {(sunburstData.length === 0) ? (
            <p>Er is geen data om weer te geven</p>
          ) : (
            <div>
              <div>
                <SunburstChart
                  data={sunburstData}
                  height={700}
                  width={700}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}


export default Sunburst;
