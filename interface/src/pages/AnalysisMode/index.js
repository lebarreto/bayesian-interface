import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import { Container, HeaderMenu, Canvas } from './styles';
import history from '../../services/history';

export default function AnalysisMode(data) {
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
        shape: 'box',
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
    },
  });

  const [analysisData] = useState([]);

  useEffect(() => {
    console.tron.log(data.location.state.data.nodes, 'data111');
    console.tron.log(data.location.state.states, 'states');
  }, []);

  analysisData.push(data.location.state.data.nodes);

  return (
    <Container>
      <HeaderMenu>
        <header>
          <h6>Bayesian Network</h6>
          <div>
            <button onClick={() => history.goBack()}>
              <FiArrowLeft size={16} color="#fff" />
              Back
            </button>
          </div>
        </header>
      </HeaderMenu>
      <Canvas>
        {analysisData[0].map((item) => (
          <div key={item.id}>
            <p>{item.label}</p>
          </div>
        ))}
      </Canvas>
    </Container>
  );
}
