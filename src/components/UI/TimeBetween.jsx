import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumericInput from 'react-numeric-input';

class TimeBetween extends Component {
  onChangeValue = (value) => {
    if (this.props.onValueChange) this.props.onValueChange(value);
  }

  render() {
    return (
      <NumericInput
        min={0}
        max={200}
        value={120}
        onChange={(value) => { this.onChangeValue(value); }}
        format={num => (num === 1 ? `${num} week` : `${num} weken`)}
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
