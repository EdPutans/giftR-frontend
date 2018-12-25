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


    mapUnaccepted = ()=>{
        return( 
        <div>
            {this.state.unaccepted.map(u=>{ return (
                <div>{u.first_name} {u.last_name} invited you to become friends 
                    <Button size='tiny' color='teal'>Accept</Button><Button size='tiny' color='red'>Reject</Button>
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
                    width: '400px',
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
