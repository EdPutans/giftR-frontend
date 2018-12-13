import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom'
// import { BrowserRouter, withRouter, Route, Switch, Redirect } from 'react-router-dom'


import Login from './containers/Login'
import Welcome from './containers/Welcome'
import Signup from './containers/Signup'
import HomePage from './containers/HomePage'
import Navbar from './components/Navbar'
import Wishlist from './containers/Wishlist'
import './App.css';
import * as adapter from './Adapter'

class App extends Component {

  // ----------- state and mounting ----------- //
  state = {
    navBarItem: '',
    currentUser: JSON.parse(localStorage.currentUser) || null,
    users: []
  }

  componentDidMount = () => {
    // this needs to be refactored to store ID and PW, find user using those upon mounting.
      // for now uses users[0] as currentUser
    return adapter.getUsers()
      .then(users => this.setState({ users }))
      .then(() => {
        console.log('state users:', this.state.users)
      
        if (!localStorage.currentUser){
          this.setState({ currentUser: this.state.users[0] })
          localStorage.setItem('currentUser', JSON.stringify(this.state.currentUser))
        } else {
          this.setState({ currentUser: JSON.parse(localStorage.currentUser)})
        }
      })
      .then(() => this.setState({ currentUser: this.state.users[0] })
      )
  }

  // ----------- redirectors ----------- //

  handleNavBarChange = (name) => {
    this.setState({ navBarItem: name })
    this.props.history.push(`/${name}`)
  }


  render() {
    const {currentUser, navBarItem} = this.state
    return (
      <div>
        <Route path='' component={ props => <Navbar { ...props }
          handleItemClick={ this.handleNavBarChange }
          activeItem={ navBarItem }
        /> } />
        <Switch>
          {/* because user is signed out, we currently only work on these ;p */ }
          <Route path='/friends' component={ props => <h1> Under construction - friends </h1> } />
          <Route path='/secret_santa' component={ props => <h1> Under construction - santa</h1> } />
          <Route path='/profile' component={ props => <Signup {...props} user={currentUser} /> } />
          <Route path='/login' component={ props => <Login { ...props } /> } />
          <Route path='/signup' component={ props => <Signup { ...props } /> } />
          <Route exact path='/' component={ props => <Welcome { ...props } /> } />
          <Route exact path='/wishlist' component={ props => <Wishlist 
                      { ...props } 
                      currentUser={ currentUser }
                      wishes={ currentUser.gifts } /> } />
          <Route exact path='/home' component={ props => <HomePage { ...props } /> } />
        </Switch>
      </div>
    )
  }
}

export default App;
