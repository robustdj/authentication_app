import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './Home'
import Dashboard from './Dashboard'
import axios from 'axios'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedInStatus: "",
      user: {}
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount() {
    this.checkLoginStatus()
  }

  checkLoginStatus() {
    axios.get("http://localhost:3001/logged_in", { withCredentials: true }).then(response => {
      if (response.data.logged_in) {
        this.setState({
          loggedInStatus: 'LOGGED_IN',
          user: response.data.user
        })
      } else if (!response.data.logged_in) {
        this.setState({
          loggedInStatus: 'NOT_LOGGED_IN',
          user: {}
        })
      }
    }).catch(error => {
      console.log("check login error", error)
    })
  }

  handleLogout() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {}
    })
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: 'LOGGED_IN',
      user: data.user
    })
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
        <Switch>
          <Route
            exact
            path={"/"}
            render={props => (
              <Home
                {...props}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                loggedInStatus={this.state.loggedInStatus}
              />
            )}
          />
          <Route
            exact
            path={"/dashboard"}
            render={props => (
              <Dashboard {...props} loggedInStatus={this.state.loggedInStatus} />
            )}
          />
        </Switch>
        </BrowserRouter>
      </div>
    )
  }
}