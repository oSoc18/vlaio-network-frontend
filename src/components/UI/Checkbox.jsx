import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

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

    // communicate the change to parent
    this.communicateChange();
  }

  communicateChange() {
    if (this.props.checkBoxChanged) {
      this.props.checkBoxChanged(this.props.name);
    }
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
  name: PropTypes.string.isRequired,
  checkBoxChanged: PropTypes.func.isRequired
};

export default Checkbox;
