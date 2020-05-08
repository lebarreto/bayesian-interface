import React, { useState } from 'react';
import Graph from 'react-graph-vis';
import {
  FiTrash,
  FiPlay,
  FiSettings,
  FiImage,
  FiArchive,
} from 'react-icons/fi';

import { Container, HeaderMenu, SideNav, Canvas, Line } from './styles';
import circle from '../../assets/circle.png';

export default function Nodes() {
  var selected = 0;

  const [visible, setVisible] = useState(false);
  const [nodeId, setNodeId] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // var graph = {
  //   nodes: [
  //     { id: 1, label: 'Node 1', description: 'Teste', color: '#e04141' },
  //     { id: 2, label: 'Node 2', description: 'Teste', color: '#e09c41' },
  //     { id: 3, label: 'Node 3', description: 'Teste', color: '#e0df41' },
  //     { id: 4, label: 'Node 4', description: 'Teste', color: '#7be041' },
  //     { id: 5, label: 'Node 5', description: 'Teste', color: '#41e0c9' },
  //   ],
  //   edges: [
  //     { from: 1, to: 2 },
  //     { from: 1, to: 3 },
  //     { from: 2, to: 4 },
  //     { from: 2, to: 5 },
  //   ],
  // };

  const [graphs, setGraphs] = useState({
    options: {
      layout: {
        hierarchical: false,
      },
      edges: {
        color: '#000000',
      },
    },
    graph: {
      nodes: [],
      edges: [],
    },
  });

  function addNode() {
    // var nodesCopy = graphs.graph.nodes.slice();

    graphs.graph.nodes.push({
      id: nodeId,
      label: name,
      description: description,
      color: '#7159c1',
    });

    console.log(graphs, 'teste');

    setVisible(false);
  }

  function openNode() {
    setVisible(true);
  }

  function removeAdd(selected) {
    const findId = graphs.graph.nodes.findIndex((node) => node.id === selected);
    graphs.graph.nodes.splice(findId, 1);
  }

  const events = {
    select: function (event) {
      selected = event.nodes[0];
      console.log(selected);
    },
  };

  return (
    <Container>
      <HeaderMenu>
        <header>
          <h6>Bayesian Network</h6>
          <div>
            <a href="/" alt="Run">
              <FiPlay size={16} color="#fff" />
              Run
            </a>
            <a href="/" alt="Run">
              <FiSettings size={16} color="#fff" />
              Settings
            </a>
            <a href="/" alt="Run">
              <FiImage size={16} color="#fff" />
              Save as image
            </a>
            <a href="/" alt="Run">
              <FiArchive size={16} color="#fff" />
              Save as blabla
            </a>
          </div>
        </header>
      </HeaderMenu>
      <SideNav>
        <div>
          <button type="button" onClick={openNode}>
            <img src={circle} alt="circle" />
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => removeAdd(selected)}
            style={{ background: 'none', border: 'none' }}
          >
            <FiTrash size={40} color="#6202ee" />
          </button>
        </div>
      </SideNav>
      {visible === true ? (
        <>
          <Canvas className="canvas">
            <label>ID:</label>
            <input
              type="number"
              name={nodeId}
              onChange={(value) => setNodeId(value.target.value)}
            />
            <label>Name:</label>
            <input
              type="text"
              name={name}
              onChange={(value) => setName(value.target.value)}
            />
            <label>Description:</label>
            <input
              type="text"
              className="description"
              name={description}
              onChange={(value) => setDescription(value.target.value)}
            />
            <button type="button" onClick={addNode}>
              Add node
            </button>
          </Canvas>
          <Line className="line" />
        </>
      ) : null}

      <div>
        <Graph
          events={events}
          style={{ height: '640px' }}
          graph={graphs.graph}
          options={graphs.options}
          getNetwork={(network) => {
            console.log(network.body, 'oq eh isso');
          }}
        />
      </div>
    </Container>
  );
}
