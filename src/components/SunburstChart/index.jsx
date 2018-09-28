import React, { Component } from 'react';
import { Sunburst } from 'react-vis';
// tmp data
import vlaioData from './data';

import '../../assets/styles/sunburst.css';

class SunburstChart extends Component {
  colors = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f'];

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

    // inserts colours the first time the data is loaded
    if (node.color === undefined) {
      switch (node.name) {
        case 'Vlaio':
          node.color = this.colors[0];
          break;
        case 'NSZ':
          node.color = this.colors[1];
          break;
        case 'UGent':
          node.color = this.colors[2];
          break;
        case 'KULeuven':
          node.color = this.colors[3];
          break;
        case 'Voka':
          node.color = this.colors[4];
          break;
        case 'Unizo':
          node.color = this.colors[5];
          break;
        default:
          node.color = this.colors[6];
      }

      // node.color = colours[colorIndex];
      // if (colorIndex < colours.length) {
      //   colorIndex += 1;
      // } else {
      //   colorIndex = 0;
      // }
      // node.dontRotateLabel = true;
      node.label = node.name;
      node.labelStyle = {
        fontSize: '14px'
      };
    }

    // changes opacity depending on the selected node
    if (selectedPath === true) {
      node.style = {
        fillOpacity: 0.2,
        stroke: 'white'
      };
    } else {
      node.style = {
        fillOpacity: 1,
        stroke: 'white'
      };
    }
    return node;
  }

  // updates the path selection on the chart
  updateChart = (selected, data, keyPath) => {
    this.refreshStyle(selected, data);

    const path = keyPath.reverse();

    let tempData = data;

    for (let i = 1; i < path.length; i += 1) {
      tempData.children.forEach((node) => {
        if (node.name === path[i]) {
          tempData = node;
          tempData.style = {
            fillOpacity: 1
          };
        }
      });
    }

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
