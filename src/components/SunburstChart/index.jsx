import React, { Component } from 'react';
import { Sunburst } from 'react-vis';
// tmp data
import vlaioData from './data';

import '../../assets/styles/sunburst.css';

class SunburstChart extends Component {
  colorMap = {
    vlaio: '#a6cee3',
    nsz: '#1f78b4',
    ugent: '#b2df8a',
    kuleuven: '#33a02c',
    voka: '#e31a1c',
    unizo: '#fdbf6f'
  };

  constructor() {
    super();
    this.state = {
      data: vlaioData,
      selected: false,
      hoveredCell: false,
      path: ''
    };
    this.refreshStyle(false, this.state.data);
  }

  // gets the path to the selected node in the json
  getKeyPath = (node) => {
    if (!node.parent) {
      return [node.data.name];
    }

    return [(node.data && node.data.name) || node.name].concat(this.getKeyPath(node.parent));
  }

  // injects style inside the data json
  refreshStyle = (selectedPath, node) => {
    if (node.children) {
      node.children.map(child => this.refreshStyle(selectedPath, child));
    }

    // inserts node information the first time the data is loaded
    if (node.color === undefined) {
      node.color = this.colorMap[node.name.toLowerCase()];
      node.label = node.name;
      node.labelStyle = {
        fontSize: '14px'
      };
    }

    // changes opacity depending on the selected node
    node.style = { stroke: '#fff' };

    if (selectedPath === true) node.style.fillOpacity = 0.2;
    else node.style.fillOpacity = 1;

    return node;
  }

  // updates the path selection on the chart
  updateChart = (selected, data, keyPath) => {
    this.refreshStyle(selected, data);

    const path = keyPath.reverse();

    let tempData = data;

    path.forEach((crumb) => {
      tempData.children.forEach((node) => {
        if (node.name !== crumb) return;
        tempData = node;
        tempData.style = {
          fillOpacity: 1
        };
      });
    });

    return data;
  }

  render() {
    const { data, selected, path } = this.state;

    return (
      <div className="sunburst-wrapper">
        <span className="sunburst__path">{path}</span>
        <Sunburst
          className="sunburst"
          hideRootNode
          data={data}
          height={700}
          width={700}
          onValueClick={() => this.setState({ selected: !selected })}
          onValueMouseOver={(node) => {
            if (selected) return;
            this.setState({
              data: this.updateChart(true, vlaioData, this.getKeyPath(node)),
              path: node ? this.getKeyPath(node).reverse().join(' > ') : '',
              hoveredCell: (node.x && node.y ? node : false)
            });
          }}
          onValueMouseOut={() => {
            if (selected) return;
            this.setState({
              path: '',
              data: this.refreshStyle(false, vlaioData),
              hoveredCell: false
            });
          }}
        />
      </div>
    );
  }
}

export default SunburstChart;
