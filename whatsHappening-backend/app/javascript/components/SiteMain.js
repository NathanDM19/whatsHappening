import React from 'react';
import { Button, Form, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

export default class SiteMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locationToSearch: null,
      mapBoxGeocodedLocation: {}
    }

    this._handleLocationChange = this._handleLocationChange.bind( this );
    this._handleSubmit = this._handleSubmit.bind( this );
  }

  _handleSubmit( event ){
    event.preventDefault();
    const locationToSearch = this.state.locationToSearch;

    const accessToken = 'pk.eyJ1IjoiZ3Jvb3RoZXdhbmRlcmVyIiwiYSI6ImNqaWI3MmQ2aTFmM3ozcG5iaGMzMW9oc3QifQ.CwYqjyg85TWZYLiwBxbg8w';
    const queryString = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ this.state.locationToSearch }.json?&access_token=${ accessToken }&types=locality&country=AU`;
console.log('queryString: ', queryString );
    const performGeocoding = () => axios.get( queryString )
    .then( response => {
      this.setState({ mapBoxGeocodedLocation: response.data });
      console.log( this.state.mapBoxGeocodedLocation )
    });

    performGeocoding();
  }

  _handleLocationChange( event ){
    this.setState({ locationToSearch: event.target.value });
  }

  render() {
    return (
      <div className='site-main'>
        <div className='search-form'>
          <div className='search-inputs'>
          <Label for="locationToSearch">Find happenings, events and things to do wherever you are ... </Label>
            <Form onSubmit={ this._handleSubmit } >
              <Input type="text" name="locationToSearch" id="locationToSearch" placeholder="Search by city, suburb, region" onChange={ this._handleLocationChange }/>
              <Button>Search</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

