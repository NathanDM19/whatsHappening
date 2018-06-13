import React, {Component} from 'react';
import Header from './Header';
import SiteContent from './SiteContent';
import Footer from './Footer';
import '../styles/application.css'
import '../styles/mapbox.css'

export default class Home extends Component {

  render() {
    return (
      <div className='site-wrapper'>
        <Header />
        <SiteContent history={ this.props.history }/>
        <Footer />
      </div>
    )
  }
}