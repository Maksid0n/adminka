import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

var App = require('./App');

const Root = (props) => {
  return (
    // React Router handler to render needed React component by path
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </Router>
  );
};

export default Root;