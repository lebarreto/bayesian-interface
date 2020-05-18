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

import { Container, HeaderMenu, SideNav, Canvas, Table } from './styles';
import circle from '../../assets/circle.png';
import seta from '../../assets/seta.png';

export default function Nodes() {
  const [visible, setVisible] = useState(false);
  const [tableVisible, setTableVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);

  const [nodeId, setNodeId] = useState('');
  const [selected, setSelected] = useState('');
  const [selected2, setSelected2] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#7159c1');

  const [state, setState] = useState([]);

  var graph = {
    nodes: [],
    edges: [],
  };

  var table = {
    states: [],
  };

  const [tableStates, setTableStates] = useState({
    tables: {
      state: table.states,
    },
  });

  const [graphs, setGraphs] = useState({
    options: {
      layout: {},
      edges: {
        color: '#0000',
        arrows: {
          to: { enabled: true, scaleFactor: 1, type: 'arrow' },
        },
      },
      nodes: {
        chosen: true,
        heightConstraint: true,
        heightConstraint: {
          minimum: 30,
        },
        font: '14px arial #fff',
      },
      interaction: {
        tooltipDelay: 150,
        multiselect: true,
        selectable: true,
        selectConnectedEdges: true,
        dragNodes: true,
      },

      manipulation: {
        deleteNode: (nodeData, callback) => {
          removeNode(nodeData);
        },
        addEdge: function (data1, data2) {
          console.log('add edge', data1, data2);
          graphs.graph.edges.push({
            id: uuid(),
            from: data1,
            to: data2,
          });

          var nodeLabel = graphs.graph.nodes.find((node) => node.id === data1);

          tableStates.tables.state.push({
            id: data2,
            parent: data1,
            label: nodeLabel,
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

    const findEdgesConnected = graphs.graph.edges.filter(
      (edge) => edge.from === selected || edge.to === selected,
    );
    var i = 0;
    if (findEdgesConnected.length > 1) {
      graphs.graph.edges.splice(findEdgesConnected[i], 1);
      i++;
    }
    graphs.graph.edges.splice(findEdgesConnected[0], 1);
  }

  function changeColor() {
    setPickerVisible(true);
  }

  function handleColorChange(hex) {
    setColor(hex.hex);
    setPickerVisible(false);
  }

  function handleTable(event) {
    var findStates = tableStates.tables.state.filter(
      (state) => state.id === event.nodes[0],
    );

    for (var i = 0; findStates.length > i; i++) {
      state.push({
        id: uuid(),
        label: findStates[i].label.label,
      });
    }

    setTableVisible(true);

    console.log(state);
    setTimeout(() => {
      while (state.length > 0) {
        state.pop();
      }

      setTableVisible(false);
    }, 5000);
  }

  var i = 0;
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
          <button
            type="button"
            onClick={() =>
              graphs.options.manipulation.addEdge(selected, selected2)
            }
          >
            <img src={seta} alt="seta" draggable />
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => graphs.options.manipulation.deleteNode(selected)}
            style={{ background: 'none', border: 'none' }}
          >
            <FiTrash size={40} color="#6202ee" />
          </button>
        </div>
      </SideNav>
      {visible === true ? (
        <>
          <Canvas className="canvas">
            <label>Name:</label>
            <input
              type="text"
              name={name}
              onChange={(value) =>
                setName(value.target.value) + setNodeId(uuid())
              }
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
      {tableVisible === true ? (
        <>
          <Table>
            {state.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>{state[0].label}</th>
                    <th style={{ width: '80px' }}>Yes</th>
                    <th style={{ width: '80px' }}>No</th>
                  </tr>
                </thead>
              </table>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>STATE 1</th>
                    <th>Probability</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Yes</strong>
                    </td>
                    <td>0.5</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>No</strong>
                    </td>
                    <td>0.5</td>
                  </tr>
                </tbody>
              </table>
            )}
          </Table>
        </>
      ) : null}
      <div>
        <Network
          style={{ height: '800px', flex: 1 }}
          onClick={(event) =>
            setSelected(event.nodes[0]) + setSelected2(event.nodes[1])
          }
          onDoubleClick={(event) => handleTable(event)}
          options={graphs.options}
        >
          {graphs.graph.nodes.map((g) => (
            <Node key={g.id} id={g.id} label={g.label} color={g.color} />
          ))}
          {graphs.graph.edges.map((e) => (
            <Edge key={e.id} id={e.id} from={e.from} to={e.to} />
          ))}
        </Network>
      </div>
    </Container>
  );
}
