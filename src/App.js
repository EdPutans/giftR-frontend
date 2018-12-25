import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
// import { BrowserRouter, withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import BodyBackgroundColor from 'react-body-backgroundcolor'
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
import NotificationList from './containers/NotificationList'
import './App.css';
import * as adapter from './Adapter'
import FriendList from './containers/FriendList'
class App extends Component {

  // ----------- state and mounting ----------- //
  state = {
    notificationsClicked: false,
    navBarItem: null,
    currentUser: null,
    gifts: [],
    friends: []
  }

  setUser=(user)=>this.setState({currentUser: user})

  async componentDidMount() {
    let data = await adapter.validate()
    if (data.error) {
      this.handleLogout()
    }
    else {
      this.setState({ currentUser: data.user })
      const gifts = await adapter.getWishes()
      this.setState({ gifts })
      const friends= await adapter.getFriends(data.user.id);
      this.setState({ friends });
      }
  }

  backToWelcome = () => this.props.history.push('/')

  setUserToLocalStorage = (user) => {
    localStorage.setItem('email', user.email)
    localStorage.setItem('currentUser', JSON.stringify(user))
  }


  // --------- prop functions ----------//

  toggleNotificationsClicked=()=>
    this.setState({notificationsClicked: !this.state.notificationsClicked})
  

  handleNavBarChange = (item) => {
    this.setState({ navBarItem: item })
    this.props.history.push(`/${item}`)
  }


  deleteWish = ( id ) => {
    let gifts = [...this.state.gifts]
    gifts = gifts.filter(w=> w.id !== id)
    return this.setState({gifts})
  }

  deleteWishFromDB=(id)=>{
    return adapter.deleteGift(id)
  }

  handleNewWish = (wish) => {
    wish.user_id = this.state.currentUser.id
    return adapter.postGift(wish)
      .then(wish => {
        this.setState({ gifts: [...this.state.gifts, wish] })
      })
      .then(this.props.history.push('/wishlist'))

  }






  // -------------- log in/out, sign up --------------


 handleLogin = async (object) => {
    const r = await adapter.signin(object.email, object.password);
   if (r.error) {
     alert(r.error);
   }
   else {
     this.setState({ currentUser: r.user });
     localStorage.removeItem('currentUser');
     localStorage.setItem('currentUser', JSON.stringify(r.user));
     localStorage.setItem('token', r.token);
     this.props.history.push('/');
     const gifts = await adapter.getWishes()
     this.setState({ gifts });
     const friends = await adapter.getFriends(r.user.id);
     this.setState({ friends });
   }
  }

  

  handleLogout = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    this.setState({ currentUser: null })
  }

  // ---------- rendering ----------

  render() {

    const { currentUser, navBarItem, loading } = this.state

    if (this.state.currentUser) {
      return (
        <div>
          {
            this.state.notificationsClicked &&
           <NotificationList 
              currentUser={this.state.currentUser}
           
           />
          }
          <Switch>
            <Route
              // path='' 
                component={ props => <Navbar { ...props }
                handleItemClick={ this.handleNavBarChange }
                activeItem={ navBarItem }
                toggleNotificationsClicked={this.toggleNotificationsClicked}
                notificationsClicked={this.state.notificationsClicked}
              /> } />
              
          </Switch>
            <div
              style={ {
                // marginTop: '5%',
                borderRadius: '5px',
                backgroundColor: '#FFFFFF',
                paddingBottom: '6%',
                // maxWidth: '700px',
                margin: '60px auto ',
                minWidth: '420px',
                width: '80%',
                position: 'absolute',
                left: 0,
                right: 0,
              } }> 
             
            <Switch>
            {/* because user is signed out, we currently only work on these ;p */ }
            <Route path='/friends' component={ props => <FriendList 
                {...props}
                currentUser={this.state.currentUser} 
                friends={this.state.friends}
              /> } />

            <Route path='/santa' component={ props => <div style={ {
              zIndex: 1,
              paddingTop: "6em"
            } }><h1> Under construction - Secret santa </h1></div> } />
            <Route path='/profile' component={ props => 
              <Profile { ...props }
                self={true}
                user={ currentUser }
                setUser={this.setUser}
                gifts={ this.state.gifts }
                // currentUser={ currentUser }
                handleLogin={ this.handleLogin }
                handleSubmit={ this.handleEditProfile }
                authenticate={ this.authenticate }
                logout={ this.handleLogout }
              /> 
              } />
            <Route exact path='/wishlist' component={ props => <Wishlist
              { ...props }
              deleteWishFromDB={this.deleteWishFromDB}
              deleteWish={this.deleteWish}
              currentUser={ currentUser }
              gifts={ this.state.gifts }
            /> }
            />
       
            <Route exact path='/' component={ props => <HomePage 
              { ...props } 
              friends={this.state.friends} 
              currentUser={this.state.currentUser}
              /> }
             />
            <Route exact path='/new_wish' component={ props =>
              <WishForm { ...props } handleSubmit={ this.handleNewWish } /> }
            />
            <Route exact path='/edit_wish' component={ props =>
              <EditWish { ...props } /> }
            />
            </Switch>
            </div>
          
        </div>
      )
    } else {
      return (
        <div
          style={ {
            // marginTop: '5%',
            borderRadius: '5px',
            backgroundColor: '#FFFFFF',
            paddingBottom: '5%',
            // maxWidth: '700px',
            margin: '60px auto',
            width: '80%',
            position: 'absolute',
            left: 0,
            right: 0,
          } }> 
        <Switch>
          <Route exact path='/' component={ props => <Welcome { ...props } /> } />
          <Route exact path='/login' component={ props => <Login { ...props } handleLogin={ this.handleLogin } back={this.backToWelcome}/> } />
          <Route exact path='/signup' component={ props => <Signup { ...props } handleLogin={ this.handleLogin } back={ this.backToWelcome } /> } />
        </Switch>
        </div>
      )
    }
  }
}

export default App;
