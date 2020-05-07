import Graph from 'react-graph-vis';
import React from 'react';

export default function Nodes() {
  const graph = {
    nodes: [
      { id: 1, label: 'Node 1', description: 'Teste', color: '#e04141' },
      { id: 2, label: 'Node 2', description: 'Teste', color: '#e09c41' },
      { id: 3, label: 'Node 3', description: 'Teste', color: '#e0df41' },
      { id: 4, label: 'Node 4', description: 'Teste', color: '#7be041' },
      { id: 5, label: 'Node 5', description: 'Teste', color: '#41e0c9' },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ],
  };

  async function addNode() {
    const node = {
      id: 6,
      label: 'OI',
      description: 'Teste',
      color: '#7159c1',
    };
    graph.nodes.push(node);

    console.log(node);
  }

  console.log(graph.nodes);

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: '#000000',
    },
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
      console.log('Selected nodes:');
      console.log(nodes);
      console.log('Selected edges:');
      console.log(edges);
    },
  };

  return (
    <div>
      <h1>React graph vis</h1>

      <p>
        <button type="button" onClick={addNode}>
          Add node
        </button>
      </p>

      <Graph
        options={options}
        events={events}
        style={{ height: '640px' }}
        graph={graph}
      />
    </div>
  );
}
