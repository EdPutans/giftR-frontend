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
        keu={friend.id}
        onClick={()=>this.handleClick(friend)}
        style={ {
            marginLeft: "calc(50% - 290px)",
            minHeight: '433px',
            maxHeight: '1050px',
            width: '300px',

            marginLeft: 'calc(50% - 145px)',
            marginLeft: '5%',
            marginRight: '10px'

        } }>
        {/* <img
        style={ {
            maxHeight: '80%', maxWidth: '80%', margin: '0 auto', display: 'block',
            padding: '5% 0 5% 0 '
        }
        }
        src={
            friend.img_url ? wish.img_url
                :
                'http://vyfhealth.com/wp-content/uploads/2015/10/yoga-placeholder1.jpg'
        }
    /> */}
        <Card.Content>
           
            <Card.Header>{ (friend.first_name ? friend.first_name : "") + ' ' + (friend.last_name ? friend.last_name : "") }</Card.Header>

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

