import React from 'react'
import * as Adapter from '../Adapter'
import FriendNotification from '../components/FriendNotification'
import SantaNotification from '../components/SantaNotification'

export default class NotificationList extends React.Component{

    state={
        unacceptedFriendRequests: [],
        santas: []
    }

    componentDidMount= async () => {
        const unacceptedFriendRequests = await Adapter.getUnaccepted(this.props.currentUser.id)
        const resp = await Adapter.getUserSantas(this.props.currentUser.id)
        const santas = resp.filter(s=>!s.read)
        return this.setState({unacceptedFriendRequests, santas})

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
            {this.state.santas.map(s =>
                <SantaNotification santa={s}
            />) }
            {this.state.unacceptedFriendRequests.map(f=>
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
        const {santas, unacceptedFriendRequests} = this.state
        return(
            this.props.clicked && <div style={
                {
                    overflowY: 'scroll',
                    zIndex: 120,
                    border: '1px solid grey',
                    padding: '5px 5px 5px 5px',
                    borderRadius: '5px',
                    backgroundColor: '#FFFFFF',
                    height: '300px',
                    minWidth: '200px',
                    width: '20%',
                    right: '15px',
                    top: '50px',
                    position: 'fixed'
                } 
            }
            >
                {unacceptedFriendRequests.length===0 && santas.length === 0? <h4>There are no notifications</h4> : this.mapUnaccepted() }

            </div>
        )
    }
}
