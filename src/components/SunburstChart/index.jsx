import React, { Component } from 'react';
import { Sunburst, Hint } from 'react-vis';

// temporary
const jsonData = JSON.parse('{"name":"Partners","children":[{"name":"Vlaio","children":[{"name":"NSZ","children":[{"name":"UGent","size":41},{"name":"KULeuven","size":4}]},{"name":"Voka","children":[{"name":"Vlaio","size":200},{"name":"KULeuven","size":12}]},{"name":"UGent","size":4},{"name":"Unizo","size":50}]},{"name":"KULeuven","children":[{"name":"UGent","size":120},{"name":"Unizo","size":50},{"name":"NSZ","children":[{"name":"Voka","children":[{"name":"Vlaio","children":[{"name":"NSZ","size":15}]},{"name":"KULeuven","children":[{"name":"UGent","size":20}]}]},{"name":"KULeuven","size":12}]},{"name":"Voka","children":[{"name":"NSZ","size":150}]},{"name":"Vlaio","children":[{"name":"NSZ","size":65}]}]},{"name":"UGent","children":[{"name":"NSZ","size":80}]}]}');
const colours = ['#e9fdca', '#dcebb2', '#bbc5a5', '#afb0a2', '#9c9a9d', '#6369d1', '#60e1e0', '#d8d2e1', '#b88e8d', '#34435e'];
let colorIndex = 0;


function getKeyPath(node) {
  if (!node.parent) {
    return [node.data.name];
  }

  return [(node.data && node.data.name) || node.name].concat(getKeyPath(node.parent));
}

function refreshStyle(selectedPath, node) {
  if (node.children) {
    node.children.map(child => refreshStyle(selectedPath, child));
  }

  if (node.color === undefined) {
    node.color = colours[colorIndex];
    if (colorIndex < colours.length) {
      colorIndex += 1;
    } else {
      colorIndex = 0;
    }
    node.label = node.name;
    console.log(node);
  }

  if (selectedPath === true) {
    node.style = {
      fillOpacity: 0.2
    };
  } else {
    node.style = {
      fillOpacity: 1
    };
  }
  return node;
}

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
    selected: false
  };

  componentWillMount() {
    refreshStyle(false, this.state.data);
  }

  render() {
    const { data, selected } = this.state;
    return (
      <div>
        <Sunburst
          hideRootNode
          data={data}
          height={500}
          width={550}
          onValueClick={() => this.setState({ selected: !selected })}
          onValueMouseOver={(node) => {
            if (selected) {
              return;
            }
            document.getElementById('path').innerText = getKeyPath(node).reverse().join(' > ');
            this.setState({
              data: updateChart(true, jsonData, getKeyPath(node))
            });
          }}
          onValueMouseOut={() => {
            if (selected) {
              return;
            }
            document.getElementById('path').innerText = ' ';
            this.setState({
              data: refreshStyle(false, jsonData)
            });
          }}
          getLabel={node => node.name}
        />
        <p id="path" />
      </div>
    );
  }
}

export default SunburstChart;
