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
    this.refreshStyle(false, props.data);
  }

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

    const path = keyPath.reverse();

    let tempData = data;
    tempData.style = {
      fillOpacity: 1
    };
    keyPath.forEach((crumb) => {
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
    console.log("azeaze")
    console.log(path)
    path.forEach((node) => {
      const index = zoomed.children.findIndex(child => child.name === node);
      zoomed = zoomed.children[index];
      console.log(node)
      console.log(zoomed);
    });
    if (zoomed === undefined){
      return this.state.data;
    }
    return zoomed;

  };


  // zoomOut = () => {
  //   const {fullPath, path, data} = this.state;
  //   console.log(fullPath);
  //   console.log(data);
  //   console.log(this.zoomIn(fullPath, data));
  //   // this.setState({
  //   //   zoomedData: this.zoomIn(fullPath, data),
  //   //   fullPath: fullPath.slice(0, -1),
  //   //   zoomed: fullPath === path
  //   // });
  // };

  render() {
    const {
      selected, zoomed, fullPath, path, data, zoomedData, hoveredCell, hoveredValue
    } = this.state;
    const {height, width} = this.props;

    return (
      <div className="sunburst-wrapper">
        <Sunburst
          className="sunburst"
          hideRootNode={!zoomed}
          data={zoomedData}
          height={height}
          width={width}
          onValueClick={(node) => {
            if (node.parent !== null) {
              this.setState({
                fullPath: fullPath.concat(this.getKeyPath(node).reverse().slice(0, -1)),
                zoomed: true,
                zoomedData: this.zoomIn(this.getKeyPath(node).reverse(), zoomedData)
              });
            } else {
              // console.log(fullPath);
              // console.log(path);
              // console.log(data);
              // console.log(this.zoomIn(fullPath, data));
              this.setState({
                zoomedData: this.zoomIn(fullPath, data),
                fullPath: fullPath.slice(0, -1),
                zoomed: fullPath.slice(0,-1).length !== 0
              });
            }
          }}
          onValueMouseOver={(node) => {
            this.setState({
              zoomedData: this.updateChart(true, zoomedData, this.getKeyPath(node)),
              path: node ? this.getKeyPath(node).reverse() : '',
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
            <span className="sunburst__name">{hoveredCell.name}</span>
            <hr />
            <span
              className="sunburst__path">{(fullPath.length !== 0) ? `${fullPath.join(' > ')} > ` : ''}{path.join(' > ')}</span>
            <br />
            <span>{hoveredValue !== null ? `aantal: ${hoveredValue}` : ''}</span>
          </div>
          {/*<input type="button" value="Uitzoomen" onClick={this.zoomOut()} />*/}
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
