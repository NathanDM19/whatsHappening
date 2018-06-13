import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './Home'
import Show from './Show'
import { Switch } from 'react-router-dom'
import Profile from './Profile'
import Test from './Test'
import '../styles/application.css'

const USER = document.getElementById('root').getAttribute('user')


const Routes = (
  <div>
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/happenings/:id" component={Show} />
        <Route exact path="/profile" component={Profile} />  
        <Route exact path="/test" component={Test} />  
    </Switch>
    </Router>
  </div>  
)

export default Routes;
