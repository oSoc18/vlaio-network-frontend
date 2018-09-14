import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

/**
 *
 */

class CheckBoxGroup extends Component {
  constructor(props) {
    super(props);

    this.state = { selected: this.props.selected };
    this.handleChangedCheckbox = this.handleChangedCheckbox.bind(this);
  }

  handleChangedCheckbox(checkbox) {
    if (checkbox in this.state.selected) {
      this.setState(prevState => ({
        selected: prevState.selected.filter(check => check !== checkbox)
      }));
    } else {
      this.setState(prevState => ({
        selected: [...prevState.selected, checkbox]
      }));
    }
  }

  render() {
    return (
      <div>
        {this.props.options.map(option => (
          <Checkbox
            checkBoxChanged={this.handleChangedCheckbox}
            name={option}
          />
        ))}
      </div>
    );
  }
}

CheckBoxGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CheckBoxGroup;
