import React, {Component} from 'react';
import Header from './Header';
import SearchResults from './SearchResults';
import Footer from './Footer';

export default class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='site-wrapper'>
        <Header history={this.props.history} />
        <SearchResults latitude={ this.props.match.params.latitude } longitude={ this.props.match.params.longitude } proximity={ this.props.match.params.proximity } />
        <Footer />
      </div>
    )
  }
}