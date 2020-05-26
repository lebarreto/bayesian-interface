import React, { useState } from 'react';
import { Network, Node, Edge } from 'react-vis-network';

import { Container } from './styles';

function AnalysisMode({ data }) {
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

  console.log(data, 'chegou');

  return (
    <Container>
      <div>
        <Network style={{ height: '800px', flex: 1 }} options={graphs.options}>
          {data.tables.state.map((node) => (
            <Node key={node.id} label={node.label.label} />
          ))}
        </Network>
      </div>
    </Container>
  );
}

export default AnalysisMode;
