import React from 'react'
import { Input, Button, Icon } from 'semantic-ui-react'
import * as adapter from '../Adapter'
import FriendCard from '../components/FriendCard'
import Wishlist from './Wishlist'


export default class HomePage extends React.Component {

state={
    friends: null,
    selectedFriend: null
}


toggleSelectFriend = (selectedFriend) =>{
    !this.state.selectedFriend?
    this.setState({selectedFriend}) 
    : 
    this.setState({selectedFriend: null})
}


componentDidMount(){
    console.log('setting state: ')
   return adapter.getFriends(this.props.currentUser.id)
      .then( resp => this.setState({ friends: (resp.friends) }) )
       .then(() => console.log('setting state: ', this.state.friends))
}    



selectedFriend = () => {
    console.log('eeee',this.state.selectedFriend)
    return (
        <Wishlist
            resetUser={this.toggleSelectFriend}
            currentUser={this.state.selectedFriend}
            gifts={this.state.selectedFriend.wishes}
            search={true}
        />
    )
}


noFriendsExist=()=>{
    return <div> No friends added yet</div>
}

friendsExist=()=> {if(this.state.friends){
    console.log(this.state.friends)
    return <div>
        {this.state.friends.map(f=> 
            <FriendCard 
                friend={f}
                toggleSelectFriend={this.toggleSelectFriend}
            /> 
          )}
    </div>
}
}


render(){
    if(this.state.friends && !this.state.selectedFriend){
        return this.friendsExist()
    }
     if(!this.state.friends && !this.state.selectedFriend){
        return this.noFriendsExist()
    }
     if(this.state.selectedFriend){
        return this.selectedFriend()
    }
}
}