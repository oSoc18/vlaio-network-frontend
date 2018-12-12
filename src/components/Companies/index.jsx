import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Company from '../../models/Company';
import EmptyState from '../UI/states/Empty';
import { api } from '../../constants';

import '../../assets/styles/timeline.css';
import '../../assets/styles/companies.css';

class Companies extends Component {
  state = {
    timeline: null,
    timelineLoading: false
  };

  componentDidMount() {
    this.getTimeline();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeCompany !== this.props.activeCompany) this.getTimeline();
  }

  getTimeline = async () => {
    await this.setState({ timelineLoading: true });
    const { activeCompany } = this.props;
    if (!activeCompany) return;
    api.company.getTimeline(activeCompany.id).then((timeline) => {
      const interactions = timeline.interaction_set;
      this.setState({
        timeline: interactions.sort((i1, i2) => new Date(i1.date) - new Date(i2.date)),
        timelineLoading: false
      });
    });
  }

  render() {
    const { timelineLoading, timeline } = this.state;
    const { activeCompany } = this.props;

    if (!activeCompany) {
      return (
        <EmptyState
          message="Kies een bedrijf uit de zijbalk om de informatie te tonen"
        />
      );
    }

    if (timelineLoading) return <p />;

    return (
      <div className="company-details">
        <table>
          <thead>
            <tr>
              <th colSpan="2">{activeCompany.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BTW-nummer</td>
              <td>{activeCompany.VAT}</td>
            </tr>
            <tr>
              <td>Naam</td>
              <td>{activeCompany.name}</td>
            </tr>
            <tr>
              <td>Aantal werknemers</td>
              <td>{activeCompany.employeeAmount}</td>
            </tr>
            <tr>
              <td>Winst</td>
              <td>{activeCompany.profit}</td>
            </tr>
          </tbody>
        </table>
        <ul className="timeline">
          { timeline.map(interaction => (
            <li key={interaction.id}>
              <span>{new Date(interaction.date).toLocaleDateString()}</span>
              <span>{interaction.partner} - {interaction.type}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Companies.defaultProps = {
  companies: [],
  activeCompany: null
};

Companies.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.instanceOf(Company)),
  activeCompany: PropTypes.instanceOf(Company)
};


export default Companies;
