import React from 'react';
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
const Sidebar = () => {
  const typesOfInteraction = ['Begeleiden', 'Community', 'Informeren', 'Netwerken', 'Sensibilisering', 'Subsidie', 'Tools'];

  const printChanges = (selected) => {
    console.log(selected);
  };
  return (
    <div className="side-nav">
      <div>
        <fieldset>
          <legend className="main-legend">Type interactie</legend>
          <CheckBoxGroup
            options={typesOfInteraction}
            changeSelection={printChanges}
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
};

export default Sidebar;
