import React, {Component} from 'react';
import Header from './Header';
import SiteContent from './SiteContent';
import Footer from './Footer';
import '../styles/application.css'

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='site-wrapper'>
        <Header/>
        <SiteContent/>
        <Footer/>
      </div>
    )
  }
}