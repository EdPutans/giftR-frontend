// styling done
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Login from './containers/Login'
import WishForm from './components/WishForm'
import Welcome from './containers/Welcome'
import Signup from './containers/Signup'
import Profile from './containers/Profile'
import HomePage from './containers/HomePage'
import Navbar from './components/Navbar'
import Wishlist from './containers/Wishlist'
import SantaMain from './containers/SantaMain'
import NotificationList from './containers/NotificationList'
import './App.css';
import Error404 from './components/Error404'
import * as adapter from './Adapter'
import FriendList from './containers/FriendList'
import * as styles from './Styles'



class App extends Component {

  // the actual working one... use this if screwed up again. milestone -  correct notifications when creating friend requests
  // ----------- state and mounting ----------- //
  state = {
    notificationsClicked: false,
    navBarItem: '',
    currentUser: null,
    gifts: [],
    friends: []
  }



toggleAppear = () =>{
    this.setState({appear: !this.state.appear})
}

  // dasd

  setUser=(user)=>this.setState({currentUser: user})



  backToWelcome = () => this.props.history.push('/')

  setUserToLocalStorage = (user) => {
    localStorage.setItem('email', user.email)
    localStorage.setItem('currentUser', JSON.stringify(user))
  }


  // --------- prop functions ----------//

  toggleNotificationsClicked=()=>
    this.setState({notificationsClicked: !this.state.notificationsClicked})


  handleNavBarChange = (item) => {
    this.setState({ navBarItem: item, notificationsClicked: false })
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


  getWishes = async () => {
    const gifts = await adapter.getWishes()
    return this.setState({ gifts });
  }

  getFriends = async (user) => {
    const friends = await adapter.getFriends(user.id);
    return this.setState({ friends });
  }

  setUserData = async (response) =>{
    if(response.user){await this.setState({ currentUser: response.user });
    await this.getWishes()
    return await this.getFriends(response.user)}
  }

  // -------------- log in/out, sign up --------------


 handleLogin = async (object) => {
    const r = await adapter.signin(object.email, object.password);
   if (r.error) {
     alert(r.error);
   }
   else {
     localStorage.removeItem('currentUser');
     localStorage.setItem('currentUser', JSON.stringify(r.user));
     localStorage.setItem('token', r.token);
     this.props.history.push('/');
     r && this.setUserData(r)
   }
  }

  async componentDidMount() {
    let r = await adapter.validate()
    if (r && r.error) {
      this.handleLogout()
    }
    else {
      r && this.setUserData(r)
      }

  }


  handleLogout = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    this.setState({ currentUser: null })
  }

  // ---------- rendering ----------




  render() {

    const { currentUser, navBarItem } = this.state

    if (this.state.currentUser) {
      return (


        <div>
            <div>
              {this.state.notificationsClicked &&

            <NotificationList
                clicked={this.state.notificationsClicked}
                refreshFriends ={ this.getFriends}
                currentUser={this.state.currentUser}
              />

              }
           </div>
          <Switch>
            <Route
                component={ props =>
                  <Navbar { ...props }
                    handleItemClick={ this.handleNavBarChange }
                    activeItem={ navBarItem }
                    toggleNotificationsClicked={this.toggleNotificationsClicked}
                    notificationsClicked={this.state.notificationsClicked}
                /> }
              />
          </Switch>
            <div style={ styles.mainDiv }>
            <Switch>
            {/* because user is signed out, we currently only work on these ;p */ }
            <Route path='/friends' component={ props =>
                
                <FriendList
                  { ...props }
                  currentUser={ this.state.currentUser }
                  friends={ this.state.friends }
                />
                
              } />

            <Route path='/santa' component={ props =>
            <div>
              <SantaMain
                currentUser={this.state.currentUser}
                friends={this.state.friends}
                {...props}
                  // props here
              />
            </div> } />
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
           
              <Route path='/:error' component={ props => <Error404 { ...props } /> } />
            </Switch>
            </div>

        </div>

      )
    } else {
      return (
        <div
          style={ styles.mainDiv }>
        <Switch>
          <Route exact path='/' component={ props => <Welcome { ...props } /> } />
          <Route exact path='/login' component={ props => <Login { ...props } handleLogin={ this.handleLogin } back={this.backToWelcome}/> } />
          <Route exact path='/signup' component={ props => <Signup { ...props } handleLogin={ this.handleLogin } back={ this.backToWelcome } /> } />
            <Route path='/:error' component={ props => <Error404 { ...props } /> } />
        </Switch>
        </div>
      )
    }
  }
}

export default App;
