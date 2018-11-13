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
  typesOfInteraction = ['Begeleiden', 'Community', 'Informeren', 'Netwerken', 'Sensibilisering', 'Subsidie', 'Tools'];

  state = {
    activeFilters: {
      types: this.typesOfInteraction,
      limit: 5,
      start: null,
      end: null,
      interval: null
    }
  }

  updateActiveTypes = (newTypes) => {
    const { applyFilters } = this.props;
    const { activeFilters } = this.state;
    applyFilters({ ...activeFilters, types: newTypes.toString().toLowerCase() });
  }

  render() {
    return (
      <div className="side-nav">
        <div>
          <fieldset>
            <legend className="main-legend">Type interactie</legend>
            <CheckBoxGroup
              options={this.typesOfInteraction}
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
            <TimeBetween />
          </fieldset>

          <fieldset>
            <legend className="main-legend">Datum van interactie</legend>
            <TimeBetweenDates />
          </fieldset>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  applyFilters: PropTypes.func.isRequired
};

export default Sidebar;
