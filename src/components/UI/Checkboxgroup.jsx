import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

class CheckBoxGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: this.props.selected };
  }

  handleChangedCheckbox = (checkbox) => {
    if (this.state.selected.includes(checkbox)) {
      this.setState(prevState => ({ // option deselected -> remove from list
        selected: prevState.selected.filter(check => check !== checkbox)
      }), this.communicateChanges);
    } else {
      this.setState(prevState => ({ // option selected -> add to list
        selected: [...prevState.selected, checkbox]
      }), this.communicateChanges);
    }
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
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeSelection: PropTypes.func
};

CheckBoxGroup.defaultProps = {
  changeSelection: null
};

export default CheckBoxGroup;
