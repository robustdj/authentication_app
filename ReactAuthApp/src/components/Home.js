import React, { Component } from 'react'
import Registration from './auth/Registration'
import Login from './auth/Login'
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data)
    this.props.history.push("/dashboard")
  }

  handleLogoutClick() {
    axios.delete('http://localhost:3001/logout', { withCredentials: true }).then(response => {
      this.props.handleLogout()
    }).catch(error => {
      console.log("logout error", error)
    })
  }

  render() {
    let authComponents

    if (this.props.loggedInStatus === 'NOT_LOGGED_IN') {
      authComponents = (
        <div>
          <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
          <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
        </div>
      )
    } else {
      authComponents = <button onClick={() => this.handleLogoutClick()}>Logout</button>
    }
    return (
      <div className='app'>
        <h1>Home</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        {authComponents}
      </div>
    )
  }
}