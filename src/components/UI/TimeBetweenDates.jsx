import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';

import 'moment/locale/nl-be';
import 'react-datepicker/dist/react-datepicker.css';

import '../../assets/styles/UI/time-between-dates.css';

class TimeBetweenDates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment([2016]),
      endDate: moment()
    };
    this.communicateChanges(this.state.startDate, this.state.endDate);
  }

  reset = () => {
    this.setState({ startDate: moment([2016]), endDate: moment() });
  }

  handleChangeStart = (date) => {
    // check if start < end, if not, set start === end
    if (!date.isBefore(this.state.endDate)) {
      this.setState({
        startDate: date,
        endDate: date
      }, () => { this.communicateChanges(this.state.startDate, this.state.endDate); });
    } else { // nothing is wrong (start < end)
      this.setState({
        startDate: date
      }, () => { this.communicateChanges(this.state.startDate, this.state.endDate); });
    }
  }

  handleChangeEnd = (date) => {
    // check if end > start, if not, set start === end
    if (!date.isAfter(this.state.startDate)) {
      this.setState({
        startDate: date,
        endDate: date
      }, () => { this.communicateChanges(this.state.startDate, this.state.endDate); });
    } else { // nothing is wrong (start < end)
      this.setState({
        endDate: date
      }, () => { this.communicateChanges(this.state.startDate, this.state.endDate); });
    }
  }

  communicateChanges(start, end) {
    this.props.onValueChange(start.toISOString(), end.toISOString());
  }

  render() {
    return (
      <div className="datepicker-container">
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChangeStart}
          dateFormat="DD/MM/YYYY"
          todayButton="Vandaag"
          locale="nl-BE"
          showYearDropdown
        />
        <span className="between-text">t.e.m.</span>
        <DatePicker
          selected={this.state.endDate}
          onChange={this.handleChangeEnd}
          dateFormat="DD/MM/YYYY"
          todayButton="Vandaag"
          locale="nl-BE"
          showYearDropdown
        />
      </div>
    );
  }
}

TimeBetweenDates.propTypes = {
  onValueChange: PropTypes.func
};

TimeBetweenDates.defaultProps = {
  onValueChange: null
};

export default TimeBetweenDates;
