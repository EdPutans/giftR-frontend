import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
// import { BrowserRouter, withRouter, Route, Switch, Redirect } from 'react-router-dom'


import Login from './containers/Login'
import WishForm from './components/WishForm'
import Welcome from './containers/Welcome'
import Signup from './containers/Signup'
import Profile from './containers/Profile'
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
    gifts: [],
    users: []
  }
  

  componentDidMount (){
  
    const user = localStorage.getItem('currentUser')
    const unUser= JSON.parse(user)
    console.log(unUser)
    adapter.validate().then(data=>{
      if(data.error){
          this.handleLogout()
      }
      else {
        this.setState({currentUser: data})
        adapter.getWishes().then(r => this.setState({ gifts: r }))
      }
    })
  }



  setUserToLocalStorage=(user)=>{
    localStorage.setItem('email', user.email)
    localStorage.setItem('currentUser', JSON.stringify(user))

  }

  refreshCurrentUser=(id)=>{
    return adapter.getUser(id)
      .then(user => {
        this.setState({currentUser:user})

      })
  }

  // ----------- redirectors ----------- //

  handleNavBarChange = (item) => {
    this.setState({ navBarItem: item })
    this.props.history.push(`/${item}`)
  }

  // --------- prop functions ----------//


  handleNewWish = (wish) => {
    wish.user_id = this.state.currentUser.id
    return adapter.postGift(wish)
      .then(wish => {
        this.setState({ wishes: [...this.state.wishes, wish] })
      })
      .then(this.props.history.push('/wishlist'))
      
  }

  authenticate = (email, password) => {
    return adapter.signin(email,password)
  }


  handleLogin = (object) =>{
    return adapter.signin(object.email, object.password).then(r=> {
      if(r.error){
        alert(r.error)
      }else{
        this.setState({currentUser:r.user})
        localStorage.removeItem('currentUser')
        localStorage.setItem('currentUser', JSON.stringify(r.user))
        console.log('reeeeeeeeee', r)
        localStorage.setItem('token', r.token)
        this.props.history.push('/')
    }
  })
  }

  handleLogout = () =>{
      localStorage.removeItem('currentUser')
      localStorage.removeItem('token')
      this.setState({ currentUser: null })
      this.props.history.push('')
  }

  render() {
    
    const { currentUser, navBarItem, loading } = this.state

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
          <Route path='/profile' component={ props => <Profile { ...props }
            user={ currentUser }
            handleSubmit={ this.handleEditProfile }
            authenticate={ this.authenticate }
            logOut={this.handleLogout}
          /> } />
          <Route exact path='/wishlist' component={ props => <Wishlist
                { ...props }
                currentUser={ currentUser }
                wishes={ this.state.gifts }
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
      <Route exact path='/' component={ props => <Welcome { ...props } /> } />
      <Route exact path='/login' component={ props => <Login { ...props } handleLogin={ this.handleLogin } /> } />
      <Route exact path='/signup' component={ props => <Signup { ...props } handleSubmit={ this.handleSignup } /> } />
      <Route path='/' component={ props => <Login { ...props } handleLogin={ this.handleLogin } /> } />
    </Switch>
    )
    }
  }
}

export default App;
