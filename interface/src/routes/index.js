import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Nodes from '../pages/Nodes';
import AnalysisMode from '../pages/AnalysisMode';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Nodes} />
      <Route path="/analysis" component={AnalysisMode} />
    </Switch>
  );
}

export default Routes;
