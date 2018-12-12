import React, { Component } from 'react';
import { BrowserRouter,withRouter, Route, Switch, Redirect } from 'react-router-dom'

import Login from './containers/Login'
import Welcome from './containers/Welcome'
import Signup from './containers/Signup'
import './App.css';
import * as adapter from './Adapter'

class App extends Component {

  state = {
    currentUser: null,
  }


  render() {
    return (
        <div>
            <Switch>
              {/* because user is signed out, we currently only work on these ;p */}
                <Route path='/login' component={ props => <Login {...props} /> } />
                <Route path='/signup' component={ props => <Signup { ...props } /> } />
                <Route exact path='/' component={ props => <Welcome { ...props } /> } />
            </Switch>
        </div>
    )
  }
}

export default App;
