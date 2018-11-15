import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

class CheckBoxGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.options
    };
  }

  check = (checkbox) => {
    this.setState(prevState => ({
      selected: [...prevState.selected, checkbox]
    }), this.communicateChanges);
  }

  uncheck = (checkbox) => {
    this.setState(prevState => ({
      selected: prevState.selected.filter(check => check !== checkbox)
    }), this.communicateChanges);
  }

  handleChangedCheckbox = (checkbox) => {
    this.state.selected.includes(checkbox) ? this.uncheck(checkbox) : this.check(checkbox);
  }

  communicateChanges() {
    if (this.props.changeSelection) {
      this.props.changeSelection(this.state.selected);
    }
  }

  render() {
    return (
      <div>
        {this.props.options.map(option => (
          <Checkbox
            key={option}
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
  changeSelection: PropTypes.func
};

CheckBoxGroup.defaultProps = {
  changeSelection: null
};

export default CheckBoxGroup;
