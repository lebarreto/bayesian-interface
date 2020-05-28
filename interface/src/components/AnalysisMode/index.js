import React, { useState, useEffect } from 'react';

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

  const [analysisData] = useState([]);

  useEffect(() => {
    analysisData.push(data);
  }, []);

  return (
    <Container>
      <div>
        {analysisData.map((node) =>
          node.tables.state.map((item) => (
            <div>
              <p>{item.label.label}</p>
            </div>
          )),
        )}
      </div>
    </Container>
  );
}

export default AnalysisMode;
