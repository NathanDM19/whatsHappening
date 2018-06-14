import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const mapboxAccessToken = 'pk.eyJ1IjoiZ3Jvb3RoZXdhbmRlcmVyIiwiYSI6ImNqaWI3MmQ2aTFmM3ozcG5iaGMzMW9oc3QifQ.CwYqjyg85TWZYLiwBxbg8w';
const mapboxUrlPrefix = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

export default class SiteMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locationToSearch: "",
      mapBoxGeocodedLocation: {},
      close5: [],
      newSearch: true
    }

    this._handleLocationChange = this._handleLocationChange.bind( this );
    this._handleSubmit = this._handleSubmit.bind( this );
    this.fillSearch = this.fillSearch.bind( this );
  }

  _handleSubmit( event ){
    event.preventDefault();
    // Check if the close5 array is populated. If it is use it
    let latitude;
    let longitude;
    const proximity = 3;

    if ( this.state.close5.length > 0 ){
      const foundLocation = this.state.close5[0];
      
      longitude = foundLocation.center[0];
      latitude = foundLocation.center[1];
    }
    
    this.props.history.push(`/search/${ latitude }/${ longitude }/${ proximity }`);
  }

  _handleLocationChange(event) {
    this.setState({ locationToSearch: event.target.value });
    if (event.target.value.length >= 3) {
      this.fetchGeo( event.target.value )
    } else {
      this.setState({ newSearch: true })
    }
  }

  fetchGeo = query => {
    axios.get(`${ mapboxUrlPrefix }/${ query }.json?&access_token=${ mapboxAccessToken }&country=AU&types=postcode,locality`)
      .then(response => {
        this.setState({close5: response.data.features})
      })
  }

  fillSearch(place) {
    this.setState({locationToSearch: place.place_name, newSearch: false})
  }

  render() {
    return (
      <div className='site-main'>
        <div className='search-form'>
          <div className='search-inputs'>
            <Label onClick={this.test} for="locationToSearch">Find happenings, events and things to do wherever you are ... </Label>
            <Form onSubmit={ this._handleSubmit } >
              <Input autocomplete="off" type="text" name="locationToSearch" id="locationToSearch" placeholder="Search by city, suburb, region" onChange={this._handleLocationChange} value={this.state.locationToSearch}/>
              <Button>Search</Button>
            </Form>
            {this.state.locationToSearch.length >= 3 && this.state.newSearch ?
              <span className="resultDropdownDiv">
                {this.state.close5.map(place =>
                  <div onClick={() => {
                    this.fillSearch(place)
                  }} className="resultDropdown">{place.place_name}</div>
                )}
              </span>
              : null}  
          </div>
        </div>
      </div>
    );
  }
}

