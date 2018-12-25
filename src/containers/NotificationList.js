import React from 'react'
import * as Adapter from '../Adapter'
import {Button} from 'semantic-ui-react'
export default class NotificationList extends React.Component{

    state={
        unaccepted: []
    }

    componentDidMount= async () => {
        const unaccepted = await Adapter.getUnaccepted(this.props.currentUser.id)
        return this.setState({unaccepted})
    }

    handleAccept= async (friendship_id)=>{
        const resp = await Adapter.acceptOrRejectFriendRequest  (friendship_id, 'confirmed')
        return console.log(resp)
    }

    handleReject= async (friendship_id)=>{
        const resp = await Adapter.acceptOrRejectFriendRequest(friendship_id, 'rejected')
        return console.log(resp)
    }

    mapUnaccepted = ()=>{
        return( 
        <div>
            {this.state.unaccepted.map(f=>{ return (
                <div key={f.user.id}>{f.user.first_name} {f.user.last_name} invited you to become friends 
                    <Button
                        size='tiny'
                        color='teal'
                        onClick={()=>this.handleAccept(f.friendship_id)}
                    >
                    Accept
                    </Button>
                    <Button 
                        size='tiny' 
                        color='red'
                        onClick={ () => this.handleReject(f.friendship_id)}
                    >
                    Reject
                    </Button>
                </div>
                )
            })}
      </div>
      )
    }
    
    


    render(){

        return(
            <div style={
                {
                    zIndex: 120,
                    border: '1px solid grey',
                    borderRadius: '5px',
                    backgroundColor: '#FFFFFF',
                    height: '300px',
                    minWidth: '200px',
                    maxWidth: '70%',
                    right: '15px',
                    top: '50px',
                    position: 'fixed'
                }
            }
            >
                {this.state.unaccepted.length===0? "loading..." : this.mapUnaccepted()}

            </div>
        )
    }
}
