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
      axios.get(`http://localhost:3000/getuser.json`)
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
        <div>Hello {this.state.user.name}</div>
      </div>
    )
  }
}

export default Profile;