
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      checked: true
    };
  }

  handleChange() {
    this.setState(prevState => ({
      checked: !prevState.checked
    }));
  }

  render() {
    const escapedName = escape(this.props.name);
    return (
      <label onClick={this.handleChange} className="checkboxLine" htmlFor={escapedName}>
        {this.props.name}
        <input
          id={escapedName}
          type="checkbox"
          checked={this.state.checked}
          onClick={this.handleChange}
          defaultChecked
        />
        <span className="checkmark-vlaio" />
      </label>);
  }
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired
};

export default Checkbox;
