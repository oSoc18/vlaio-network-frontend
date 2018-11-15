import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/styles/UI/checkbox.css';

const Checkbox = ({ name, checked, checkBoxChanged }) => {
  const escapedName = escape(name);
  const semanticName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <label className="checkboxLine" htmlFor={escapedName}>
      {semanticName}
      <input
        id={escapedName}
        type="checkbox"
        defaultChecked={checked}
        onChange={checkBoxChanged}
      />
      <span className="checkmark-vlaio" />
    </label>);
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  checkBoxChanged: PropTypes.func.isRequired
};

export default Checkbox;
