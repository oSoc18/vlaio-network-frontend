import React from 'react';
import CheckBoxGroup from './UI/Checkboxgroup';
import '../assets/styles/sidebar.css';

/**
 *    TODO: get sidenav based on the type of shown visualisation
 *    (overview, network of interactions,recommendations)
 */

let selected = ['Begeleiden', 'Community', 'Informeren', 'Netwerken', 'Sensibilisering', 'Subsidie', 'Tools'];

const printChanges = (changes) => {
  selected = changes;
};

const Sidebar = () => (
  <div className="side-nav">
    <div>
      <fieldset>
        <CheckBoxGroup
          options={['Begeleiden', 'Community', 'Informeren', 'Netwerken', 'Sensibilisering', 'Subsidie', 'Tools']}
          selected={selected}
          changeSelection={printChanges}
        />
        {/* <h1>Type interactie</h1>
        <CheckBox name="Begeleiden" />
        <CheckBox name="Community" />
        <CheckBox name="Informeren" />
        <CheckBox name="Netwerken" />
        <CheckBox name="Sensibilisering" />
        <CheckBox name="Subsidie" />
        <CheckBox name="Tools" /> */}
      </fieldset>

    </div>
  </div>
);

export default Sidebar;
