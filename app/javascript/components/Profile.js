import React from 'react';
import Header from './Header'
import axios from 'axios'

class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    const fetchUser = () => {
      axios.get(`getuser.json`)
        .then(response => {
          this.setState({user: response.data})
        })
    }
    fetchUser()
  }
  render() {
    return (
      <div>
        <Header />
        <div className="mainShowDiv">
          <div className="profileBody">  
            <div className="placeholderPhoto">
            </div>
            <p className="inline up">{this.state.user.name}</p>
          </div>  
        </div>
      </div>
    )
  }
}

export default Profile;