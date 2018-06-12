import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './Home'
import Show from './Show'
import { Switch } from 'react-router-dom'
import Test from './Test'
import '../styles/application.css'

const Routes = (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/happenings/:id" component={Show} />
      <Route exact path="/test" component={Test} />
    </Switch>
  </Router>
)

export default Routes;
