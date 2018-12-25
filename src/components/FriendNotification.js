import React from 'react'
import * as Adapter from '../Adapter'
import { Button, Card } from 'semantic-ui-react'



export default class FriendNotification extends React.Component {


render(){
    const { friend } = this.props
    return(
       
        <div key={ friend.user.id }>{ friend.user.first_name } { friend.user.last_name } invited you to become friends
            <Button
                size='tiny'
                color='teal'
                onClick={ () => this.props.handleAccept(friend.friendship_id) }
            >
                Accept
            </Button>
            <Button
                size='tiny'
                color='red'
                onClick={ () => this.props.handleReject(friend.friendship_id) }
            >
                Reject
             </Button>
        </div>

    )
}

}
