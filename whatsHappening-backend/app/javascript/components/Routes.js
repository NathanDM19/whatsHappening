import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

// Content component imports
import Home from './Home';

const Routes = (
 <Router>
    <Route exact path="/" component={ Home } />
 </Router>
)

export default Routes;