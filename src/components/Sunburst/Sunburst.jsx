import React, {Component} from 'react';
import {Sunburst} from 'react-vis';
import PropTypes from 'prop-types';
import chroma from 'chroma-js';

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

  constructor(props) {
    super(props);
    this.refreshSunburst(props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.state.data) this.refreshSunburst(prevProps);
  }

  refreshSunburst = (props) => {
    this.state = {
      data: props.data,
      zoomedData: props.data,
      zoomed: false,
      selected: false,
      hoveredCell: false,
      fullPath: [],
      path: [],
      hoveredValue: null,
      colours: {}
    };
    if (localStorage.getItem('colorMap') === null) {
      localStorage.setItem('colorMap', JSON.stringify(this.colorMap));
    }
    this.state.colours = JSON.parse(localStorage.getItem('colorMap'));
    this.state.fullPath.push(this.state.data.name);
    this.refreshStyle(false, props.data);
  };

  // gets the path to the selected node in the json
  getKeyPath = (node) => {
    if (!node.parent) {
      if (typeof node.data !== 'undefined') {
        return [node.data.name];
      }
      return [node.name];
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
      const {colours} = this.state;
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
    const reversedPath = keyPath.slice(0,-1).reverse();
    let tempData = data;
    tempData.style = {
      fillOpacity: 1
    };
    reversedPath.forEach((crumb) => {
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

  zoomIn = (path, zoomedData) => {
    let zoomed = zoomedData;
    path.forEach((crumb) => {
      const index = zoomed.children.findIndex(child => child.name === crumb);
      zoomed = zoomed.children[index];
    });
    return zoomed;
  };

  render() {
    const {
      selected, zoomed, fullPath, path, data, zoomedData, hoveredCell, hoveredValue
    } = this.state;
    const {height, width} = this.props;
    return (
      <div className="sunburst-wrapper">
        <Sunburst
          className="sunburstChart"
          hideRootNode={!zoomed}
          data={zoomedData}
          height={height}
          width={width}
          onValueClick={(node) => {
            if (node.parent !== null) {
              this.setState({
                fullPath: fullPath.concat(path),
                zoomed: true,
                zoomedData: this.zoomIn(path, zoomedData)
              });
            }
            else {
              this.setState({
                fullPath: fullPath.slice(0, -1),
                zoomed: fullPath.slice(0, -1).length !== 1,
                zoomedData: this.zoomIn(fullPath.slice(1, fullPath.length - 1), data)
              });
            }
          }}
          onValueMouseOver={(node) => {
            this.setState({
              zoomedData: this.updateChart(true, zoomedData, this.getKeyPath(node)),
              path: node ? this.getKeyPath(node).slice(0, -1).reverse() : '',
              hoveredCell: (node.x && node.y ? node : false),
              hoveredValue: node.size
            });
          }}
          onValueMouseOut={() => {
            this.setState({
              path: [],
              zoomedData: this.refreshStyle(false, zoomedData),
              hoveredCell: false,
              hoveredValue: null
            });
          }}
        />
        <div className="info__container">
          <div className="sunburstinfo__container">
            <span className="sunburst__name">{hoveredCell ? hoveredCell.name : zoomedData.name}</span>
            <hr />
            <span className="sunburst__path">{fullPath.join(' > ')} &gt; {path.join(' > ')}</span>
            <br />
            <span>aantal: {hoveredValue !== null ? `${hoveredValue}` : ''}</span>
          </div>
        </div>
      </div>
    );
  }
}

SunburstChart.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default SunburstChart;
