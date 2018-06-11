import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from '../components/Home'

const Routes = (
  <Router>
    <Route exact path="/" component={Home}/>
  </Router>
)

export default Routes;
