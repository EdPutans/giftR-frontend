import React, { Component } from 'react';
import { BrowserRouter,withRouter, Route, Switch, Redirect } from 'react-router-dom'



import Login from './containers/Login'
import Welcome from './containers/Welcome'
import Signup from './containers/Signup'
import HomePage from './containers/HomePage'
import Navbar from './components/Navbar'
import './App.css';
import * as adapter from './Adapter'

class App extends Component {

  state = {
    currentUser: null,
  }


  render() {
    return (
        <div>
          <Route path='' component={props => <Navbar {...props}/>}/>
            <Switch>
              {/* because user is signed out, we currently only work on these ;p */}
                <Route path='/friends' component={props => <h1> Under construction - friends </h1> } />
                <Route path='/secret_santa' component={ props =>  <h1> Under construction - santa</h1> } />
                <Route path='/profile' component={ props =>  <h1> Under construction - profile</h1> } />
                <Route path='/login' component={ props => <Login {...props} /> } />
                <Route path='/signup' component={ props => <Signup { ...props } /> } />
                <Route exact path='/' component={ props => <Welcome { ...props } /> } />
                <Route exact path='/home' component={ props => <HomePage { ...props } /> } />
            </Switch>
        </div>
    )
  }
}

export default App;
