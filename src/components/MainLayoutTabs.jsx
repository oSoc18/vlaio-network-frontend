import React, { Component } from 'react';
import Tab from './UI/Tab';
import '../assets/styles/mainlayouttabs.css';


class MainLayoutTabs extends Component {
  render() {
    return (
      <div className="main-layout-tabs">
          <Tab selected />
          <Tab />
          <Tab />
        </div>
    );
  }
}

export default MainLayoutTabs;
