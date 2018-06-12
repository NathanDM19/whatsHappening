import React from 'react';
import { Button, Form, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

const TOKEN = "pk.eyJ1IjoibmF0aGFuZG0xOSIsImEiOiJjamliNDNuY3ExZTN6M3FwZmxnNjhkd3d5In0.tg6mrqeNeX5XujlPmN1V9Q"


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
    this._handleSubmit = this._handleSubmit.bind(this);
    this.fillSearch = this.fillSearch.bind(this)
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

  _handleLocationChange(event) {
    this.setState({ locationToSearch: event.target.value });
    if (event.target.value.length >= 3) {
      this.fetchGeo(event.target.value)
    } else {
      this.setState({newSearch: true})
    }
  }
  fetchGeo = query => {
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?&access_token=${TOKEN}&country=AU&types=postcode,locality`)
      .then(response => {
        console.log(response.data)
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
          <Label for="locationToSearch">Find happenings, events and things to do wherever you are ... </Label>
            <Form onSubmit={ this._handleSubmit } >
              <Input type="text" name="locationToSearch" id="locationToSearch" placeholder="Search by city, suburb, region" onChange={this._handleLocationChange} value={this.state.locationToSearch}/>
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

