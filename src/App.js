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
import Loading from './components/Loading'
import './App.css';
import * as adapter from './Adapter'

class App extends Component {

  // ----------- state and mounting ----------- //
  state = {
    navBarItem: '',
    currentUser: null,
    users: []
  }
  // componentWillReceiveProps(){
  //   console.log("PROPPING!!!!!")
  //   console.log('current user: ', this.state.currentUser)
  //   return adapter.getUsers()
  //     .then(users => this.setState({ users }))
  //     .then(() => {
  //       if (!localStorage.currentUser) {
  //         this.setState({ currentUser: this.state.users[0] })
  //         console.log('mounted, currentUser:', this.state.currentUser)
  //         this.setUserToLocalStorage(this.state.users[0])
  //       } else {
  //         this.setState({ currentUser: JSON.parse(localStorage.currentUser) })
  //         console.log('mounted 2, currentUser:', this.state.currentUser)
  //       }
  //     })
  //     .then(() => this.setState({ currentUser: this.state.users[0] })
  //     )
  // }

  componentDidMount (){
    console.log("MOUNTING!!!!!!")
    console.log('current user: ',this.state.currentUser)
    return adapter.getUsers()
      .then(users => this.setState({ users }))
      .then(() => {
        if (!localStorage.currentUser) {
          // this.setState({ currentUser: this.state.users[0] })
          console.log('mounted, currentUser:', this.state.currentUser)
          // this.setUserToLocalStorage(this.state.users[0])
        } else {
          this.setState({ currentUser: JSON.parse(localStorage.currentUser) })
          console.log('mounted 2, currentUser:', this.state.currentUser)
        }
      })
      // .then(() => this.setState({ currentUser: this.state.users[0] })
      // )
  }


  // checkForUser = () =>
  //    localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null


  setUserToLocalStorage=(user)=>{
    let deepUserCopy = {...user}
    console.log('deep copy', deepUserCopy)
    localStorage.setItem('currentUser', JSON.stringify(deepUserCopy))
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


  handleLogin = (email, password) =>{
    return adapter.signin(email,password).then(r=> {
      if(r.error){
        alert(r.error)
      }else{
        this.setState({currentUser:r})
        localStorage.clear()
        this.setUserToLocalStorage(r)
        this.props.history.push('/')
    }
  })
  }

  render() {
      console.log("RENDERING!!!!!!")
    const { currentUser, navBarItem } = this.state
    // if(!localStorage.currentUser){
    //   // return <Route path='' component ={<div>YOURE NOT LOGGED IN</div>} />
    // }else{
    if (this.state.currentUser){
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
          <Route exact path='/' component={ props => <Welcome { ...props } /> } />
          <Route exact path='/wishlist' component={ props => <Wishlist
                { ...props }
                currentUser={ currentUser }
                wishes={ currentUser.gifts }
             /> } 
          />
          <Route exact path='/home' component={ props => <HomePage { ...props } /> } />
          <Route exact path='/new_wish' component={ props =>
            <WishForm { ...props } handleSubmit={ this.handleNewWish } /> } 
          />
        </Switch>
      </div>
    )
    } else { return (
    <Switch>
      {/* <Loading /> */}
      <Route exact path='/login' component={ props => <Login { ...props } handleLogin={ this.handleLogin } /> } />
      <Route exact path='/signup' component={ props => <Signup { ...props } handleSubmit={ this.handleSignup } /> } />
      <Route path='/' component={ props => <Login { ...props } handleLogin={ this.handleLogin } /> } />
    </Switch>
    )
    }
  }
}

export default App;
