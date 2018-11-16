import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

class CheckBoxGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxes: props.options.reduce((boxes, option) => {
        boxes[option] = true;
        return boxes;
      }, {})
    };
  }

  reset = () => {
    this.setState((prevState) => {
      const { checkboxes } = prevState;
      Object.keys(checkboxes).forEach((c) => { checkboxes[c] = true; });
    });
  }

  handleChangedCheckbox = (checkbox) => {
    this.setState((prevState) => {
      const prevChecked = prevState.checkboxes[checkbox];
      return { checkboxes: { ...prevState.checkboxes, [checkbox]: !prevChecked } };
    }, () => this.communicateChanges());
  }

  communicateChanges() {
    const { checkboxes } = this.state;
    const { changeSelection } = this.props;
    const selected = Object.keys(checkboxes).filter(checkbox => checkboxes[checkbox]);
    changeSelection(selected);
  }

  render() {
    const { checkboxes } = this.state;
    return (
      <div>
        {Object.keys(checkboxes).map(option => (
          <Checkbox
            key={option}
            checkBoxChanged={() => this.handleChangedCheckbox(option)}
            checked={checkboxes[option]}
            name={option}
          />
        ))}
      </div>
    );
  }
}

CheckBoxGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeSelection: PropTypes.func
};

CheckBoxGroup.defaultProps = {
  changeSelection: null
};

export default CheckBoxGroup;
