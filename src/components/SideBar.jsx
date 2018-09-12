import React from 'react';
import CheckBox from './UI/Checkbox';
import '../assets/styles/sidebar.css';

/**
 *    TODO: get sidenav based on the type of shown visualisation
 *    (overview, network of interactions,recommendations)
 */
const Sidebar = () => (
  <div className="side-nav">
    <div>
      <fieldset>
        <h1>Type interactie</h1>
        <CheckBox name="Begeleiden" />
        <CheckBox name="Community" />
        <CheckBox name="Informeren" />
        <CheckBox name="Netwerken" />
        <CheckBox name="Sensibilisering" />
        <CheckBox name="Subsidie" />
        <CheckBox name="Tools" />
      </fieldset>

    </div>
  </div>
);

export default Sidebar;
