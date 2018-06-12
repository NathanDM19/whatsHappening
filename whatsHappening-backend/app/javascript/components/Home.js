import React, {Component} from 'react';
import { Button, Alert } from 'react-bootstrap';
import Header from './Header'

class Home extends Component {
  render() {
    return (
      <div className='site-wrapper'>
        <Header className='site-header'/>
        <div className='homepage-map'>MAP
        <Alert color="primary">
        This is a primary alert — check it out!
        </Alert>
        </div>
        <div className='homepage-featured'>FEATURED</div>
        <footer className='site-footer'>FOOTER</footer>
      </div>
    )
  }
}

export default Home;