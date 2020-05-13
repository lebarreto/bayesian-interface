import React, { useState } from 'react';
import { CompactPicker } from 'react-color';
import {
  FiTrash,
  FiPlay,
  FiSettings,
  FiImage,
  FiArchive,
} from 'react-icons/fi';
import { Network, Node, Edge } from 'react-vis-network';
import { uuid } from 'uuidv4';

import { Container, HeaderMenu, SideNav, Canvas, Line } from './styles';
import circle from '../../assets/circle.png';
import seta from '../../assets/seta.png';

export default function Nodes() {
  const [visible, setVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);

  const [nodeId, setNodeId] = useState(0);
  const [selected, setSelected] = useState(0);
  const [selected2, setSelected2] = useState(0);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#7159c1');

  var graph = {
    nodes: [],
    edges: [],
  };

  const [graphs, setGraphs] = useState({
    drag: false,

    options: {
      layout: {
        improvedLayout: true,
        hierarchical: {
          enabled: true,
          sortMethod: 'directed',
          direction: 'UD',
          nodeSpacing: 200,
          levelSeparation: 200,
        },
      },
      edges: {
        color: '#000000',
        arrows: {
          to: { enabled: true, scaleFactor: 1, type: 'arrow' },
          smooth: { enabled: true },
        },
      },
      nodes: {
        chosen: true,
      },
      interaction: {
        tooltipDelay: 150,
        multiselect: true,
        selectable: true,
        selectConnectedEdges: true,
      },
      deleteNode: (nodeData, callback) => {
        removeNode(nodeData);
      },
      manipulation: {
        addEdge: function (data1, data2) {
          console.log('add edge', data1, data2);
          graphs.graph.edges.push({
            id: uuid(),
            from: '2',
            to: '1',
          });
        },
      },
    },
    graph: {
      nodes: graph.nodes,
      edges: graph.edges,
    },
  });

  function addNode() {
    console.log(color);
    graphs.graph.nodes.push({
      id: nodeId,
      label: name,
      description: description,
      color: color,
    });

    setVisible(false);
  }

  function openNode() {
    setVisible(true);
  }

  function removeNode(selected) {
    const findId = graphs.graph.nodes.findIndex((node) => node.id === selected);
    graphs.graph.nodes.splice(findId, 1);
  }

  function changeColor() {
    setPickerVisible(true);
  }

  function handleColorChange(hex) {
    setColor(hex.hex);
    setPickerVisible(false);
  }

  async function addEdge(event) {
    console.log(event, 'oi');
  }

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
          <button type="button" onClick={addEdge}>
            <img src={seta} alt="seta" draggable />
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => graphs.options.deleteNode(selected)}
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
            <label>Color:</label>
            <button type="button" onClick={changeColor} className="changeColor">
              Choose color
            </button>
            {pickerVisible === true && (
              <div>
                <CompactPicker
                  className="picker"
                  color={color}
                  onChangeComplete={handleColorChange}
                />
              </div>
            )}
            <button type="button" onClick={addNode} className="add">
              Add node
            </button>
          </Canvas>
        </>
      ) : null}
      <div>
        <Network
          style={{ height: '800px', flex: 1 }}
          onClick={(event) => setSelected(event.nodes[0])}
        >
          {graphs.graph.nodes.map((g) => (
            <Node key={g.id} id={g.id} label={g.label} color={g.color} />
          ))}
          {graphs.graph.edges.map((e) => (
            <Edge key={e.id} id={e.id} from={e.from} to={e.to} />
          ))}
        </Network>
        {/* {graphs.graph.nodes ? (
          <Graph
            style={{ height: '800px', flex: 1 }}
            graph={graphs.graph}
            options={graphs.options}
            events={events}
            getNetwork={(network) => network.renderer.renderingActive === true}
          />
        ) : null} */}
      </div>
    </Container>
  );
}
