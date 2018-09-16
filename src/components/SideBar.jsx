import React from 'react';
import CheckBoxGroup from './UI/Checkboxgroup';
import TimeBetweenDates from './UI/TimeBetweenDates';
import '../assets/styles/sidebar.css';

/**
 *    TODO: get sidenav based on the type of shown visualisation
 *    (overview, network of interactions,recommendations)
 */

let selected = ['Begeleiden', 'Community', 'Informeren', 'Netwerken', 'Sensibilisering', 'Subsidie', 'Tools'];

const printChanges = (changes) => {
  selected = changes;
};

/**
 * This will probably be the most similar existing example
 * https://www.vlaio.be/nl/subsidies-financiering/subsidiedatabank/zoek?thema=26
 * --
 * But these headers would be a better choice
 * https://www.vlaio.be/nl/begeleiding-advies/coaching-en-advies
 */
const Sidebar = () => (
  <div className="side-nav">
    <div>
      <fieldset>
        <legend className="main-legend">Type interactie</legend>
        <CheckBoxGroup
          options={['Begeleiden', 'Community', 'Informeren', 'Netwerken', 'Sensibilisering', 'Subsidie', 'Tools']}
          selected={selected}
          changeSelection={printChanges}
        />
      </fieldset>

      <fieldset>
        <legend className="main-legend">Type bedrijf</legend>
        <CheckBoxGroup
          options={['Financiering', 'Financiële moeilijkheden', 'Innovatie', 'Internationalisatie',
            'Prestart', 'Start', 'Startup/Scaleup', 'Student']}
          selected={selected}
          changeSelection={printChanges}
        />
      </fieldset>

      <fieldset>
        <legend className="main-legend">Datum van interactie</legend>
        <TimeBetweenDates />
      </fieldset>
    </div>
  </div>
);

export default Sidebar;
