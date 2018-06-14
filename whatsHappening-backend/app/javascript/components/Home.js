import React, {Component} from 'react';
import Header from './Header';
import SiteContent from './SiteContent';
import Footer from './Footer';
import '../styles/application.css'
// import '../styles/mapbox.css'

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log("history", this.props.history)
    return (
      <div className='site-wrapper'>
        <Header history={this.props.history}/>
        <SiteContent history={ this.props.history }/>
        <Footer />
      </div>
    )
  }
}