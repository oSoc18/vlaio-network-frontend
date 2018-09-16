import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumericInput from 'react-numeric-input';
import './Checkbox.css';

class TimeBetween extends Component {
  constructor(props) {
    super(props);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(value) {
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  }

  render() {
    return (
      <NumericInput
        min={0}
        max={200}
        value={120}
        onValueChange={(value) => { this.onChangeValue(value); }}
      />
    );
  }
}

TimeBetween.propTypes = {
  onValueChange: PropTypes.func
};

TimeBetween.defaultProps = {
  onValueChange: null
};
export default TimeBetween;
