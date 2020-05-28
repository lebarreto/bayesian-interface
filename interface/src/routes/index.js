import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Nodes from '../pages/Nodes';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Nodes} />
    </Switch>
  );
}

export default Routes;
