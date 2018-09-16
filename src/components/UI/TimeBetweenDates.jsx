import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/nl-be';
import 'react-datepicker/dist/react-datepicker.css';
import './time-between-dates.css';

class TimeBetweenDates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        dateFormat="DD/MM/YYYY"
        todayButton="Vandaag"
        locale="nl-BE"
        showYearDropdown
      />);
  }
}

export default TimeBetweenDates;
