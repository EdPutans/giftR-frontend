import React from 'react'
import * as Adapter from '../Adapter'
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
            {this.state.unaccepted.map(f=>
            <div key={f.id}>
                <FriendNotification
                    refreshFriends ={ this.props.refreshFriends}
                    currentUser={this.props.currentUser}
                    friend={f}
                    handleAccept={this.handleAccept}
                    handleReject={this.handleReject}
                />
            </div>) }
      </div>
      )
    }

    
    


    render(){

        return(
            <div style={ this.props.clicked?
                {
                    overflowY: 'scroll',
                    zIndex: 120,
                    border: '1px solid grey',
                    borderRadius: '5px',
                    backgroundColor: '#FFFFFF',
                    height: '300px',
                    minWidth: '200px',
                    width: '20%',
                    right: '15px',
                    top: '50px',
                    position: 'fixed'
                } : {display: 'none'}
            }
            >
                {this.state.unaccepted.length===0? <h4>There are no pending friend requests</h4> : this.mapUnaccepted() }

            </div>
        )
    }
}
