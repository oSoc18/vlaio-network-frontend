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

    // communicate the change to parent
    this.props.checkBoxChanged(this.props.name);
  }

  render() {
    const escapedName = escape(this.props.name);
    return (
      <label onClick={this.handleChange} className="checkboxLine" htmlFor={escapedName}>
        {this.props.name}
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
