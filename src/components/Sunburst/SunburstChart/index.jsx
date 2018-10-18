import React, { Component } from 'react';
import { Sunburst } from 'react-vis';
import PropTypes from 'prop-types';
import chroma from 'chroma-js';
// tmp data
import vlaioData from './data';

import '../../../assets/styles/sunburst.css';

class SunburstChart extends Component {
  colorMap = {
    vlaio: '#a6cee3',
    nsz: '#1f78b4',
    ugent: '#b2df8a',
    kuleuven: '#33a02c',
    voka: '#e31a1c' ,
    //unizo: '#fdbf6f'
  };

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      selected: false,
      hoveredCell: false,
      path: '',
      hoveredValue: null,
      colours: {}
    };
    if (localStorage.getItem('colorMap') === null) {
      localStorage.setItem('colorMap', JSON.stringify(this.colorMap));
    }
    this.state.colours = JSON.parse(localStorage.getItem('colorMap'));
    this.refreshStyle(false, props.data);
  }

  static get defaultProps() {
    return {
      height: 0,
      width: 0,
      data: {}
    };
  }

  static get propTypes() {
    return {
      height: PropTypes.number,
      width: PropTypes.number,
      data: PropTypes.object
    };
  }

  // gets the path to the selected node in the json
  getKeyPath = (node) => {
    if (!node.parent) {
      return [node.data.name];
    }

    return [(node.data && node.data.name) || node.name].concat(this.getKeyPath(node.parent));
  };

  // injects style inside the data json
  refreshStyle = (selectedPath, node) => {
    if (node.children) {
      node.children.map(child => this.refreshStyle(selectedPath, child));
    }

    // inserts node information the first time the data is loaded
    if (node.color === undefined) {
      let colours = this.state.colours;
      if (colours[node.name.toLowerCase()] === undefined) {
        colours[node.name.toLowerCase()] = chroma.scale(['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#e31a1c', '#fdbf6f'])(Math.random()).hex(); //'#'+((1<<24)*Math.random()|0).toString(16);
        localStorage.setItem('colorMap', JSON.stringify(colours));
      }
      node.color = colours[node.name.toLowerCase()];
      // node.label = node.name;
      // node.labelStyle = {
      //   fontSize: '14px'
      // };
    }

    // changes opacity depending on the selected node
    node.style = {stroke: '#fff'};

    if (selectedPath === true) node.style.fillOpacity = 0.2;
    else node.style.fillOpacity = 1;

    return node;
  };

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
  };

  render() {
    const { selected, path, data, hoveredCell, hoveredValue } = this.state;
    return (
      <div className="sunburst-wrapper">
        <div>
          <span className="sunburst__path">{path} {hoveredValue !== null ? `aantal: ${hoveredValue}` : ''}</span>
          <Sunburst
            className="sunburst"
            hideRootNode
            data={data}
            height={this.props.height}
            width={this.props.width}
            onValueClick={() => this.setState({selected: !selected})}
            onValueMouseOver={(node) => {
              if (selected) return;
              this.setState({
                data: this.updateChart(true, data, this.getKeyPath(node)),
                path: node ? this.getKeyPath(node).reverse().join(' > ') : '',
                hoveredCell: (node.x && node.y ? node : false),
                hoveredValue: node.size
              });
            }}
            onValueMouseOut={() => {
              if (selected) return;
              this.setState({
                path: '',
                data: this.refreshStyle(false, data),
                hoveredCell: false,
                hoveredValue: null
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default SunburstChart;
