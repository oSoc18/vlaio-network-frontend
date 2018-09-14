import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

/**
 *
 */

class CheckBoxGroup extends Component {
  constructor(props) {
    super(props);

    this.state = { selected: [] };
    this.setCheckBoxes();
    this.handleChangedCheckbox = this.handleChangedCheckbox.bind(this);
  }

  setCheckBoxes() {
    const [options] = this.props.options;

    for (let option = 0; option < options.length; option += 1) {
      this.options.push(<Checkbox name={option} />);
    }
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
}

CheckBoxGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CheckBoxGroup;
