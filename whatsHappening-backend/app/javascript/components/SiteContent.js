import React from 'react';
import SiteMain from './SiteMain'

export default class SiteContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='site-content'>
        <SiteMain />
      </div>
    );
  }
}

