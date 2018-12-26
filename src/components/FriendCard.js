import React from 'react'
import { Card } from 'semantic-ui-react'

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
    return <Card
        key={friend.id}
        onClick={()=>this.handleClick(friend)}
            style={ {
                // minHeight: '200px',
                // width: '300px',
                marginTop: '3em',
          
            } }
        >
        <img alt='user profile pic' style={ { maxHeight: '80%', maxWidth: '80%', margin: '0 auto', display: 'block', 
                    padding: '5% 0 5% 0 '
                } } src={ friend.img_url || "http://chittagongit.com//images/default-profile-icon/default-profile-icon-1.jpg" } />
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

