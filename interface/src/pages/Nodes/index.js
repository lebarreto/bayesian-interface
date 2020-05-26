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
import AnalysisMode from '../../components/AnalysisMode';

export default function Nodes() {
  const [visible, setVisible] = useState(false);
  const [tableVisible, setTableVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [analysisVisible, setAnalysisVisible] = useState(false);
  const [nodeVisible, setNodeVisible] = useState(true);

  const [nodeId, setNodeId] = useState('');
  const [selected, setSelected] = useState('');
  const [selected2, setSelected2] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#7159c1');

  const [state] = useState([]);
  const [firstState] = useState([]);
  const [othersState] = useState([]);
  const [list] = useState([]);

  var graph = {
    nodes: [],
    edges: [],
  };

  var table = {
    states: [],
  };

  const [tableStates] = useState({
    tables: {
      state: table.states,
    },
  });

  const [graphs] = useState({
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
          list.splice(0, list.length);
          state.splice(0, state.length);
        },
        addEdge: function (data1, data2) {
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
    var findEdgeFromId;
    var findStates;

    while (findEdgesConnected.length > 1 && i < findEdgesConnected.length) {
      findEdgeFromId = graphs.graph.edges.findIndex(
        (edges) => edges.from === findEdgesConnected[i].from,
      );

      findStates = tableStates.tables.state.findIndex(
        (state) => state.parent === findEdgesConnected[i].from,
      );

      graphs.graph.edges.splice(findEdgeFromId, 0);
      tableStates.tables.state.splice(findStates, 0);
      firstState.splice(findStates, 0);
      othersState.splice(findStates, 0);

      list.splice(0, list.length);
      state.splice(0, state.length);

      i++;
    }

    list.splice(0, list.length);

    findEdgeFromId = graphs.graph.edges.findIndex(
      (edges) => edges.from === findEdgesConnected[0].from,
    );

    findStates = tableStates.tables.state.findIndex(
      (state) => state.parent === findEdgesConnected[0].from,
    );

    graphs.graph.edges.splice(findEdgeFromId, 1);
    tableStates.tables.state.splice(findStates, 1);
    firstState.splice(findStates, 0);
    othersState.splice(findStates, 0);
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

    firstState.push(state[0]);

    for (var i = 1; state.length > i; i++) {
      othersState.push(state[i]);
    }

    setTableVisible(true);

    setTimeout(() => {
      while (state.length > 0) {
        state.pop();
        list.splice(0, list.length);
        firstState.splice(0, firstState.length);
        othersState.splice(0, othersState.length);
      }

      setTableVisible(false);
    }, 5000);
  }

  function saveAsImage() {
    var canvas = document.getElementsByTagName('canvas')[0];
    var image = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');

    downloadURL(image);
  }

  function downloadURL(img) {
    var a = document.createElement('a');
    a.href = img.replace('image/png', 'image/octet-stream');
    a.download = 'graph.png';
    a.click();
  }

  function runModel() {
    setNodeVisible(false);
    setAnalysisVisible(true);
  }

  return (
    <Container>
      <HeaderMenu>
        <header>
          <h6>Bayesian Network</h6>
          <div>
            <button onClick={runModel}>
              <FiPlay size={16} color="#fff" />
              Run
            </button>
            <a href="/" alt="Run">
              <FiSettings size={16} color="#fff" />
              Settings
            </a>
            <button onClick={saveAsImage}>
              <FiImage size={16} color="#fff" />
              Save as image
            </button>
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
                  {firstState.map((first) => (
                    <tr key={first.id}>
                      <th style={{ width: '120px' }}>{first.label}</th>
                      <td colSpan="2" style={{ fontWeight: 'bold' }}>
                        Yes
                      </td>
                      <td colSpan="2" style={{ fontWeight: 'bold' }}>
                        No
                      </td>
                    </tr>
                  ))}
                  {othersState.length > 0
                    ? othersState.map((states) => (
                        <tr key={states.id}>
                          <th>{states.label}</th>
                          <td style={{ fontWeight: 'bold' }}>Yes</td>
                          <td style={{ fontWeight: 'bold' }}>No</td>
                          <td style={{ fontWeight: 'bold' }}>Yes</td>
                          <td style={{ fontWeight: 'bold' }}>No</td>
                        </tr>
                      ))
                    : null}
                </thead>
                {othersState.length > 0 ? (
                  <tbody>
                    <tr>
                      <th>Yes</th>
                      <td>0.4</td>
                      <td>0.1</td>
                      <td>0.4</td>
                      <td>0.1</td>
                    </tr>
                    <tr>
                      <th>No</th>
                      <td>0.4</td>
                      <td>0.1</td>
                      <td>0.4</td>
                      <td>0.1</td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <th style={{ width: '120px' }}>Yes</th>
                      <td colSpan="2">0.9</td>
                      <td colSpan="2">0.1</td>
                    </tr>
                    <tr>
                      <th style={{ width: '120px' }}>No</th>
                      <td colSpan="2">0.9</td>
                      <td colSpan="2">0.1</td>
                    </tr>
                  </tbody>
                )}
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
        {nodeVisible === true ? (
          <Network
            id="canvas"
            key="canvas"
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
        ) : null}
      </div>
      {analysisVisible === true ? <AnalysisMode data={tableStates} /> : null}
    </Container>
  );
}
