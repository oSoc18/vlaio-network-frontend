import React, { Component } from 'react';
import { Sunburst, Hint } from 'react-vis';
//import './sunburst.css';

// temporary
const jsonData = JSON.parse('{"name":"Partners","children":[{"name":"Vlaio","children":[{"name":"NSZ","children":[{"name":"UGent","size":41},{"name":"KULeuven","size":4}]},{"name":"Voka","children":[{"name":"Vlaio","size":200},{"name":"KULeuven","size":12}]},{"name":"UGent","size":4},{"name":"Unizo","size":50}]},{"name":"KULeuven","children":[{"name":"UGent","size":120},{"name":"Unizo","size":50},{"name":"NSZ","children":[{"name":"Voka","children":[{"name":"Vlaio","children":[{"name":"NSZ","size":15}]},{"name":"KULeuven","children":[{"name":"UGent","size":20}]}]},{"name":"KULeuven","size":12}]},{"name":"Voka","children":[{"name":"NSZ","size":150}]},{"name":"Vlaio","children":[{"name":"NSZ","size":65}]}]},{"name":"UGent","children":[{"name":"NSZ","size":80}]}]}');
const colours = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f'];

let colorIndex = 0;

const labelStyle = {
  fontSize: '14px'
};

// gets the path to the selected node in the json
function getKeyPath(node) {
  if (!node.parent) {
    return [node.data.name];
  }

  return [(node.data && node.data.name) || node.name].concat(getKeyPath(node.parent));
}

// Injects style inside the data json
function refreshStyle(selectedPath, node) {
  if (node.children) {
    node.children.map(child => refreshStyle(selectedPath, child));
  }

  // inserts colours the first time the data is loaded
  if (node.color === undefined) {
    switch (node.name){
      case 'Vlaio':
        node.color = colours[0];
        break;
      case 'NSZ':
        node.color = colours[1];
        break;
      case 'UGent':
        node.color = colours[2];
        break;
      case 'KULeuven':
        node.color = colours[3];
        break;
      case 'Voka':
        node.color = colours[4];
        break;
      case 'Unizo':
        node.color = colours[5];
        break;
      default:
        node.color = colours[6];
    }

    // node.color = colours[colorIndex];
    // if (colorIndex < colours.length) {
    //   colorIndex += 1;
    // } else {
    //   colorIndex = 0;
    // }
    // node.dontRotateLabel = true;
    node.label = node.name;
    node.labelStyle = labelStyle;
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
function updateChart(selected, data, keyPath) {
  refreshStyle(selected, data);

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

class SunburstChart extends Component {
  state = {
    data: jsonData,
    selected: false,
    hoveredCell: false
  };

  componentWillMount() {
    refreshStyle(false, this.state.data);
  }

  render() {
    const { data, selected, hoveredCell } = this.state;
    return (
      <div className="main-content overview">
        <p id="path" /> <br />
        <Sunburst
          style={{ float: 'left' }}
          hideRootNode
          data={data}
          height={700}
          width={700}
          onValueClick={() => this.setState({ selected: !selected })}
          onValueMouseOver={(node) => {
            if (selected) {
              return;
            }
            let breadCrumbs = ' ';
            (node ? breadCrumbs = getKeyPath(node).reverse().join(' > ') : breadCrumbs = ' ');
            document.getElementById('path').innerText = breadCrumbs;
            this.setState({
              data: updateChart(true, jsonData, getKeyPath(node)),
              hoveredCell: (node.x && node.y ? node : false)
            });
          }}
          onValueMouseOut={() => {
            if (selected) {
              return;
            }
            document.getElementById('path').innerText = ' ';
            this.setState({
              data: refreshStyle(false, jsonData),
              hoveredCell: false
            });
          }}
        />
        <p id="path" />
      </div>
    );
  }
}

export default SunburstChart;
