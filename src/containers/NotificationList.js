import React from 'react'
import * as Adapter from '../Adapter'
import {Button} from 'semantic-ui-react'
import FriendNotification from '../components/FriendNotification'


export default class NotificationList extends React.Component{

    state={
        unaccepted: []
    }

    componentDidMount= async () => {
        const unaccepted = await Adapter.getUnaccepted(this.props.currentUser.id)
        return this.setState({unaccepted})
    }

    handleAccept= async (friendship_id)=>{
        return await Adapter.acceptOrRejectFriendRequest(friendship_id, 'confirmed')
    }

    handleReject= async (friendship_id)=>{
        return await Adapter.acceptOrRejectFriendRequest(friendship_id, 'rejected')
    }

    mapUnaccepted = ()=>{
        return( 
        <div>
            {this.state.unaccepted.map(f=><FriendNotification 
                refreshFriends ={ this.props.refreshFriends}
                currentUser={this.props.currentUser}
                friend={f}
                handleAccept={this.handleAccept}
                handleReject={this.handleReject}
            />) }
      </div>
      )
    }

    
    


    render(){

        return(
            <div style={
                {
                    overflowY: 'scroll',
                    zIndex: 120,
                    border: '1px solid grey',
                    borderRadius: '5px',
                    backgroundColor: '#FFFFFF',
                    height: '300px',
                    minWidth: '200px',
                    width: '50%',
                    right: '15px',
                    top: '50px',
                    position: 'fixed'
                }
            }
            >
                {this.state.unaccepted.length===0? "There are no pending friend requests" : this.mapUnaccepted() }

            </div>
        )
    }
}
