import React from 'react'
import { Card } from 'semantic-ui-react'
import * as animate from '../Animations'
import * as Styles from '../Styles'

export default class FriendCard extends React.Component{


mapWishCount=(friend)=>{
    if(friend.wishes && friend.wishes.length>0){
        return `has made ${friend.wishes.length} wishes`
    }else{
        return `hasn't made any wishes`
    }
}

handleClick(friend){
    this.props.toggleSelectFriend(friend)
}



friendCard =(friend) => {
    return animate.fade(
    <Card
        key={friend.id}
        onClick={()=>this.handleClick(friend)}
        style={ Styles.topSpace }
        >
            <div style={ Styles.mapImageContainer}>
        <img alt='user profile pic'
         style={  Styles.mapImage } 
         src={ friend.img_url || 'https://pngimage.net/wp-content/uploads/2018/05/default-user-png-2.png' } />
        </div>
        <Card.Content>
           
            <Card.Header>{ (friend.first_name ? friend.first_name : "") + ' ' + (friend.last_name? friend.last_name : "") }</Card.Header>

            <Card.Meta>
                { friend.age ? friend.age : "" }
            </Card.Meta>
            <Card.Description>{ this.mapWishCount(friend) }</Card.Description>
        </Card.Content>
        <Card.Content extra>
        </Card.Content>
    </Card>
    )
}


render(){
    const { friend } = this.props   
    return(
        <div>
           {this.friendCard(friend)}
        </div>
    )
}
}

