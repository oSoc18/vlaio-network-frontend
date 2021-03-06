import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumericInput from 'react-numeric-input';

class TimeBetween extends Component {
  state = {
    amountOfWeeks: 120
  };

  reset = () => {
    this.setState({ amountOfWeeks: 120 });
  }

  onChangeValue = (value) => {
    this.setState({ amountOfWeeks: value });
    this.props.onValueChange(value);
  }

  render() {
    const { amountOfWeeks } = this.state;
    return (
      <NumericInput
        min={0}
        max={200}
        value={amountOfWeeks}
        onChange={(value) => { this.onChangeValue(value); }}
        format={num => (num === 1 ? `${num} week` : `${num} weken`)}
      />
    );
  }
}

TimeBetween.propTypes = {
  onValueChange: PropTypes.func.isRequired
};

export default TimeBetween;
