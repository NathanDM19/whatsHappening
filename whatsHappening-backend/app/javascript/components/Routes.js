import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home'
import Show from './Show'
import Search from './Search'
import Test from './Test'
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Routes = (
  <Router>
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/happenings/:id" component={ Show } />
      <Route exact path="/test" component={ Test } />
      <Route exact path="/search/:latitude/:longitude/:proximity" component={ Search } />
    </Switch>
  </Router>
)

export default Routes;
