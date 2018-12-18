import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
// import { BrowserRouter, withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'

import Login from './containers/Login'
import WishForm from './components/WishForm'
import Welcome from './containers/Welcome'
import Signup from './containers/Signup'
import Profile from './containers/Profile'
import HomePage from './containers/HomePage'
import Navbar from './components/Navbar'
import Wishlist from './containers/Wishlist'
import EditWish from './components/EditWish'
import Loading from './components/Loading'
import './App.css';
import * as adapter from './Adapter'

class App extends Component {

  // ----------- state and mounting ----------- //
  state = {
    navBarItem: '',
    currentUser: null,
    gifts: [],
   
  }


  componentDidMount() {
    const user = localStorage.getItem('currentUser')
    const unUser = JSON.parse(user)
    adapter.validate().then(data => {
      if (data.error) {
        this.handleLogout()
      }
      else {
        this.setState({ currentUser: data.user })
        adapter.getWishes()
          .then(r => this.setState({ gifts: r }))
          
      }
    })

  }



  setUserToLocalStorage = (user) => {
    localStorage.setItem('email', user.email)
    localStorage.setItem('currentUser', JSON.stringify(user))
  }



  // ----------- redirectors ----------- //

  handleNavBarChange = (item) => {
    this.setState({ navBarItem: item })
    this.props.history.push(`/${item}`)
  }

  // --------- prop functions ----------//


  handleNewWish = (wish) => {
    wish.user_id = this.state.currentUser.id
    document.querySelector(".loader").remove()
    return adapter.postGift(wish)
      .then(wish => {
        this.setState({ gifts: [...this.state.gifts, wish] })
      })
      .then(this.props.history.push('/wishlist'))

  }


  // -------------- log in/out, sign up --------------

  authenticate = (email, password) => {
    return adapter.signin(email, password)
  }


  handleLogin = (object) => {
    return adapter.signin(object.email, object.password).then(r => {
      if (r.error) {
        alert(r.error)
      } else {
        this.setState({ currentUser: r.user })
        localStorage.removeItem('currentUser')
        localStorage.setItem('currentUser', JSON.stringify(r.user))
        localStorage.setItem('token', r.token)
        this.props.history.push('/')
        adapter.getWishes().then(r => this.setState({ gifts: r }))
      }
    })
  }

  handleLogout = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    this.setState({ currentUser: null })
    this.props.history.push('')
  }

  // ---------- rendering ----------

  render() {

    const { currentUser, navBarItem, loading } = this.state

    if (this.state.currentUser) {
      return (
        <div>
          <Route 
            path='' 
            component={ props => <Navbar { ...props }
            handleItemClick={ this.handleNavBarChange }
            activeItem={ navBarItem }
          /> } />
          <Switch>
            {/* because user is signed out, we currently only work on these ;p */ }
            <Route path='/friends' component={ props => <div style={ {
              zIndex: 1,
              paddingTop: "6em"
            } }><h1> Under construction - friends </h1></div> } />
            <Route path='/santa' component={ props => <div style={ {
              zIndex: 1,
              paddingTop: "6em"
            } }><h1> Under construction - Secret santa </h1></div> } />
            <Route path='/profile' component={ props => <Profile { ...props }
              user={ currentUser }
              gifts={ this.state.gifts }
              // currentUser={ currentUser }
              handleLogin={ this.handleLogin }
              handleSubmit={ this.handleEditProfile }
              authenticate={ this.authenticate }
              logOut={ this.handleLogout }
            /> } />
            <Route exact path='/wishlist' component={ props => <Wishlist
              { ...props }
              currentUser={ currentUser }
              gifts={ this.state.gifts }
            /> }
            />
            <Route exact path='/' component={ props => <HomePage { ...props } /> } />
            <Route exact path='/new_wish' component={ props =>
              <WishForm { ...props } handleSubmit={ this.handleNewWish } /> }
            />
            <Route exact path='/edit_wish' component={ props =>
              <EditWish { ...props } /> }
            />
          </Switch>
        </div>
      )
    } else {
      return (
        <Switch>
          <Route exact path='/' component={ props => <Welcome { ...props } /> } />
          <Route exact path='/login' component={ props => <Login { ...props } handleLogin={ this.handleLogin } /> } />
          <Route exact path='/signup' component={ props => <Signup { ...props } handleLogin={ this.handleLogin } /> } />
        </Switch>
      )
    }
  }
}

export default App;
