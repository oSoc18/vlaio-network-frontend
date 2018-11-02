import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/styles/UI/tab.css';

const Tab = props => (
  <div className={props.selected === true ? 'tab selected' : 'tab'}>
    {props.name}
  </div>
);

Tab.propTypes = {
  name: PropTypes.string,
  selected: PropTypes.bool
};

Tab.defaultProps = {
  name: 'tab-item',
  selected: false
};
export default Tab;
