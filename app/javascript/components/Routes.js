import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home'
import Show from './Show'
import Search from './Search'
import Search2 from './Search2'
import Test from './Test'
import Profile from './Profile'
import { TransitionGroup, CSSTransition } from "react-transition-group";

const USER = document.getElementById('root').getAttribute('user')

const Routes = (
  <div>
  <Router>
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/happenings/:id" component={ Show } />
      <Route exact path="/test" component={ Test } />
      <Route exact path="/search/:latitude/:longitude/:proximity" component={Search} />
      <Route exact path="/search2" component={Search2} />
        <Route exact path="/profile" component={Profile} />      
    </Switch>
    </Router>
  </div>  
)

export default Routes;
