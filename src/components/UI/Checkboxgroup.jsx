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
    let [selects] = this.state.selected;
    if (checkbox in selects) {
      selects = selects.remove(checkbox);
    } else {
      selects = selects.push(checkbox);
    }
    this.setState({
      selected: selects
    });
  }

  render() {
    return (
      <div>
        {this.props.options.map(option => <Checkbox name={option} />) }
      </div>
    );
  }
}

CheckBoxGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CheckBoxGroup;
