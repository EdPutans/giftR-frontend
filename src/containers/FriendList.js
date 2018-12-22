import React from 'react'
import { Input, Button, Icon } from 'semantic-ui-react'
import * as adapter from '../Adapter'
import FriendCard from '../components/FriendCard'

export default class HomePage extends React.Component {

state={
    friends: null
}

componentDidMount(){
    console.log('setting state: ')
   return adapter.getFriends(this.props.currentUser.id)
      .then( resp => this.setState({ friends: (resp.friends) }) )
       .then(() => console.log('setting state: ', this.state.friends))
}    


noFriendsExist=()=>{
    return <div> No friends added yet</div>
}

friendsExist=()=> {if(this.state.friends){
    console.log(this.state.friends)
    return <div>
        {this.state.friends.map(f=> < FriendCard friend={f}/> )}
    
    </div>
}
}


render(){
    if(this.state.friends){
        return this.friendsExist()
    }else{
        return this.noFriendsExist()
    }
}
}