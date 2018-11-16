import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { api } from '../../constants';
import EmptyState from '../UI/states/Empty';
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
      this.setState({ sunburstData: response });
    }).catch(e => console.error(e));
  };

  changeType(type) {
    this.setState({ currentType: type });
    this.getData((type));
  }

  render() {
    const { sunburstData, currentType } = this.state;
    const { resetFilters } = this.props;

    return (
      <div className="sunburst">
        <div>
          <div className="type_button_container">
            <button
              id="partnerButton"
              type="button"
              className={`type_button${currentType === 'partner' ? ' selected' : ''}`}
              onClick={() => { this.changeType('partner'); }}
            >
              Partners
            </button>
          </div>
          <div className="type_button_container">
            <button
              id="interactionButton"
              type="button"
              className={`type_button${currentType === 'interaction' ? ' selected' : ''}`}
              onClick={() => { this.changeType('interaction'); }}
            >
              Interactions
            </button>
          </div>
        </div>
        <div>
          {(sunburstData.length === 0) ? (
            <EmptyState
              message="Er zijn geen interactiesequenties gekend voor uw geselecteerde filters."
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

Sunburst.propTypes = {
  resetFilters: PropTypes.func.isRequired
};

export default Sunburst;
