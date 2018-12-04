import React, { Component } from 'react';
import { Sunburst } from 'react-vis';
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
    unizo: '#fdbf6f',
    vub: '#882255'
  };

  constructor(props) {
    super(props);
    this.refreshStyle(false, props.data);
    this.maxDepth = 3;
    this.state = {
      data: props.data,
      zoomedData: this.limitDataDepth(props.data),
      zoomed: false,
      hoveredCell: false,
      fullPath: [props.data.name],
      path: [],
      hoveredValue: null
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.data.name !== this.state.data.name) this.refreshSunburst(nextProps);
  }

  refreshSunburst = (props) => {
    this.refreshStyle(false, props.data);
    this.setState({
      data: props.data,
      zoomedData: this.limitDataDepth(props.data),
      zoomed: false,
      fullPath: [props.data.name],
      path: []
    });
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
      if (localStorage.getItem('colorMap') === null) {
        localStorage.setItem('colorMap', JSON.stringify(this.colorMap));
      }
      const colours = JSON.parse(localStorage.getItem('colorMap'));
      if (colours[node.name.toLowerCase()] === undefined) {
        colours[node.name.toLowerCase()] = chroma.scale(['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#e31a1c', '#fdbf6f'])(Math.random()).hex(); // '#'+((1<<24)*Math.random()|0).toString(16);
        localStorage.setItem('colorMap', JSON.stringify(colours));
      }
      node.color = colours[node.name.toLowerCase()];
    }

    // changes opacity depending on the selected node
    node.style = { stroke: '#fff' };

    if (selectedPath === true) node.style.fillOpacity = 0.2;
    else node.style.fillOpacity = 1;

    return node;
  };

  // updates the path selection on the chart
  updateChart = (selected, data, keyPath) => {
    this.refreshStyle(selected, data);
    const reversedPath = keyPath.slice(0, -1).reverse();
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

  zoomIn = (path) => {
    const { data } = this.state;
    let zoomed = data;
    path.forEach((crumb) => {
      const index = zoomed.children.findIndex(child => child.name === crumb);
      zoomed = zoomed.children[index];
    });
    return this.limitDataDepth(zoomed);
  };

  limitDataDepth = (data, maxDepth = this.maxDepth) => {
    let dataToLimit = JSON.parse(JSON.stringify(data));
    if (maxDepth === 0) {
      dataToLimit.children = [];
      return dataToLimit;
    }
    const newMaxDepth = maxDepth - 1;

    for (let i = 0; i < dataToLimit.children.length; i++) {
      dataToLimit.children[i] = this.limitDataDepth(dataToLimit.children[i], newMaxDepth);
    }
    return dataToLimit;
  };

  render() {
    const {
      zoomed, fullPath, path, zoomedData, hoveredCell, hoveredValue
    } = this.state;
    const { height, width } = this.props;
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
                zoomedData: this.zoomIn(fullPath.slice(1, fullPath.length).concat(path))
              });
            } else {
              this.setState({
                fullPath: fullPath.slice(0, -1),
                zoomed: fullPath.slice(0, -1).length !== 1,
                zoomedData: this.zoomIn(fullPath.slice(1, fullPath.length - 1))
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
