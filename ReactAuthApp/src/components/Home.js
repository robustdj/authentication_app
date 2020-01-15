import React, { Component } from 'react'
import Registration from './auth/Registration'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data)
    this.props.history.push("/dashboard")
  }

  render() {
    return (
      <div className='app'>
        <h1>Home</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    )
  }
}