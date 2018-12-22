import React from 'react'
import { Card } from 'semantic-ui-react'
export default class FriendCard extends React.Component{


render(){
    const { friend } = this.props
    return(
        <div>
            <Card
                // onClick={ () => this.props.selectUser(u) }
                header={ (friend.first_name ? friend.first_name : "") + ' ' + (friend.last_name ? friend.last_name : "") }
                // meta={ u.gifts.length + " wishes" }
            />
        </div>
    )
}
}