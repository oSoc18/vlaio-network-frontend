import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckBoxGroup from './UI/Checkboxgroup';
import TimeBetween from './UI/TimeBetween';
import TimeBetweenDates from './UI/TimeBetweenDates';

import '../assets/styles/sidebar.css';

/**
 * This will probably be the most similar existing example
 * https://www.vlaio.be/nl/subsidies-financiering/subsidiedatabank/zoek?thema=26
 * --
 * But these headers would be a better choice
 * https://www.vlaio.be/nl/begeleiding-advies/coaching-en-advies
 */
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilters: {
        type: props.typesOfInteraction.toString(),
        limit: 5,
        start: null,
        end: null,
        timeframe: null
      }
    };
  }

  applyFilters = (newFilter) => {
    const { applyFilters } = this.props;
    const { activeFilters } = this.state;
    applyFilters({ ...activeFilters, ...newFilter });
  }

  updateActiveTypes = (newTypes) => {
    this.applyFilters({ type: newTypes.toString().toLowerCase() });
  }

  updateDateInterval = (start, end) => {
    this.applyFilters({ start, end });
  };

  updateWeekInterval = (weeks) => {
    this.applyFilters({ timeframe: weeks });
  }

  render() {
    const { typesOfInteraction } = this.props;
    return (
      <div className="side-nav">
        <div>
          <fieldset>
            <legend className="main-legend">Type interactie</legend>
            <CheckBoxGroup
              options={typesOfInteraction}
              changeSelection={this.updateActiveTypes}
            />
          </fieldset>

          {/* <fieldset>
            <legend className="main-legend">Type bedrijf</legend>
            <CheckBoxGroup
              options={['Financiering', 'Financiële moeilijkheden', 'Innovatie',
              'Internationalisatie', 'Prestart', 'Start', 'Startup/Scaleup', 'Student']}
              selected={selected}
              changeSelection={printChanges}
            />
          </fieldset> */}

          <fieldset>
            <legend className="main-legend">Interval tussen interacties</legend>
            <TimeBetween onValueChange={this.updateWeekInterval} />
          </fieldset>

          <fieldset>
            <legend className="main-legend">Datum van interactie</legend>
            <TimeBetweenDates onValueChange={this.updateDateInterval} />
          </fieldset>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  applyFilters: PropTypes.func.isRequired,
  typesOfInteraction: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Sidebar;
