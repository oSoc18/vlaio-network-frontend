import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../assets/styles/UI/checkbox.css';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: true };
  }

  handleChange = () => {
    this.setState(prevState => ({
      checked: !prevState.checked
    }));

    this.props.checkBoxChanged(this.props.name);
  }

  render() {
    const { name } = this.props;
    const escapedName = escape(name);
    const semanticName = name.charAt(0).toUpperCase() + name.slice(1);
    return (
      <label className="checkboxLine" htmlFor={escapedName}>
        {semanticName}
        <input
          id={escapedName}
          type="checkbox"
          defaultChecked={this.state.checked}
          onChange={this.handleChange}
        />
        <span className="checkmark-vlaio" />
      </label>);
  }
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  checkBoxChanged: PropTypes.func.isRequired
};

export default Checkbox;
