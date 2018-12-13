import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
// import { BrowserRouter, withRouter, Route, Switch, Redirect } from 'react-router-dom'


import Login from './containers/Login'
import WishForm from './components/WishForm'
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
    currentUser: null,
    users: []
  }


  componentDidMount = () => {
    // this needs to be refactored to store ID and PW, find user using those upon mounting.
    // for now uses users[0] as currentUser
    return adapter.getUsers()
      .then(users => this.setState({ users }))
      .then(() => {
        console.log('state users:', this.state.users)

        if (!localStorage.currentUser) {
          this.setState({ currentUser: this.state.users[0] })
          this.setUserToLocalStorage(this.state.currentUser)
        } else {
          this.setState({ currentUser: JSON.parse(localStorage.currentUser) })
        }
      })
      .then(() => this.setState({ currentUser: this.state.users[0] })
      )
  }


  // checkForUser = () =>
  //    localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null


  setUserToLocalStorage=(user)=>{
    let deepUserCopy = {...user}
    localStorage.setItem('currentUser',JSON.stringify(deepUserCopy))
  }

  refreshCurrentUser=(id)=>{
    return adapter.getUser(id)
      .then(user => {
        this.setState({currentUser:user})
        this.setUserToLocalStorage(user)
                    })
  }

  // ----------- redirectors ----------- //

  handleNavBarChange = (item) => {
    this.setState({ navBarItem: item })
    this.props.history.push(`/${item}`)
  }

  // --------- prop functions ----------//

  // profile
  handleEditProfile = () => { }
  handleSignup = () => { }



  // gifts

  handleNewWish = (wish) => {
    wish.user_id = this.state.currentUser.id
    return adapter.postGift(wish)
      .then(wish => this.refreshCurrentUser(wish.user_id))
      .then(this.props.history.push('/wishlist'))
  }





  render() {
    const { currentUser, navBarItem } = this.state
    if(!localStorage.currentUser){
      return (<div>Welcome page.</div>)
    }else{
    return (
      <div>
        <Route path='' component={ props => <Navbar { ...props }
          handleItemClick={ this.handleNavBarChange }
          activeItem={ navBarItem }
        /> } />
        <Switch>
          {/* because user is signed out, we currently only work on these ;p */ }
          <Route path='/friends' component={ props => <h1> Under construction - friends </h1> } />
          <Route path='/santa' component={ props => <h1> Under construction - santa</h1> } />
          <Route path='/profile' component={ props => <Signup { ...props }
            user={ currentUser }
            handleSubmit={ this.handleEditProfile }
          /> } />
          <Route path='/login' component={ props => <Login { ...props } /> } />
          <Route path='/signup' component={ props => <Signup { ...props } handleSubmit={ this.handleSignup } /> } />
          <Route exact path='/' component={ props => <Welcome { ...props } /> } />
          <Route exact path='/wishlist' component={ props => <Wishlist
                { ...props }
                currentUser={ currentUser }
                wishes={ currentUser.gifts } /> } 
          />
          <Route exact path='/home' component={ props => <HomePage { ...props } /> } />
          <Route exact path='/new_wish' component={ props =>
            <WishForm { ...props } handleSubmit={ this.handleNewWish } /> } 
          />
        </Switch>
      </div>
    )}
  }
}

export default App;
