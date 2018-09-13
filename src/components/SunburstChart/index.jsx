import React, { Component } from 'react';
import { Sunburst } from 'react-vis';

// temporary
const jsonData = JSON.parse('{"title":"Partners","children":[{"title":"Vlaio","children":[{"title":"NSZ","children":[{"title":"UGent","size":41},{"title":"KULeuven","size":4}]},{"title":"Voka","children":[{"title":"Vlaio","size":200},{"title":"KULeuven","size":12}]},{"title":"UGent","size":4},{"title":"Unizo","size":50}]},{"title":"KULeuven","children":[{"title":"UGent","size":120},{"title":"Unizo","size":50},{"title":"NSZ","children":[{"title":"Voka","children":[{"title":"Vlaio","children":[{"title":"NSZ","size":15}]},{"title":"KULeuven","children":[{"title":"UGent","size":20}]}]},{"title":"KULeuven","size":12}]},{"title":"Voka","children":[{"title":"NSZ","size":150}]},{"title":"Vlaio","children":[{"title":"NSZ","size":65}]}]},{"title":"UGent","children":[{"title":"NSZ","size":80}]}]}');
const colours = ['#e9fdca', '#dcebb2', '#bbc5a5', '#afb0a2', '#9c9a9d', '#6369d1', '#60e1e0', '#d8d2e1', '#b88e8d', '#34435e'];
let colorIndex = 0;


function getKeyPath(node) {
  if (!node.parent) {
    return [node.data.title];
  }

  return [(node.data && node.data.title) || node.title].concat(getKeyPath(node.parent));
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
      if (node.title === path[i]) {
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
    data: jsonData
  };

  componentWillMount() {
    refreshStyle(false, this.state.data);
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Sunburst
          hideRootNode
          data={data}
          height={500}
          width={550}
          onValueMouseOver={(node) => {
            document.getElementById('path').innerText = getKeyPath(node).reverse().join(' > ');
            this.setState({
              data: updateChart(true, jsonData, getKeyPath(node))
            });
          }}
          onValueMouseOut={() => {
            document.getElementById('path').innerText = ' ';
            this.setState({
              data: refreshStyle(false, jsonData)
            });
          }}
        />
        <p id="path" />
      </div>
    );
  }
}

export default SunburstChart;
