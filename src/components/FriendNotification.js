import React from 'react'
import { Button, Card} from 'semantic-ui-react'
// styling not required in this file


export default class FriendNotification extends React.Component {

    state={
        addressed: false
    }

    handleAccept= async (friendship_id)=>{
        await this.props.handleAccept(friendship_id)
        await this.props.refreshFriends(this.props.currentUser)
        return this.setState({addressed: "Accepted :)"})
    }

    handleReject=(friendship_id)=>{
        this.props.handleReject(friendship_id)
        this.setState({addressed: "Rejected :("})
    }


    feedCard = () =>{
        const { friend } = this.props
        return(  
            <Card fluid>
                <Card.Content>
                <Card.Header>{friend.user.first_name} {friend.user.last_name}</Card.Header>
                <Card.Meta>wants you to be their friend</Card.Meta>
                <Button
                    size='tiny'
                    color='teal'
                    onClick={ () => this.handleAccept(friend.friendship_id) }
                >
                Accept
                </Button>
                <Button
                    size='tiny'
                    color='red'
                    onClick={ () => this.handleReject(friend.friendship_id) }
                >
                  Reject
            </Button>
                </Card.Content>
        </Card>
       )
    }



    render(){
        if(!this.state.addressed){
                return( this.feedCard()
            )
        }else{
            return <div>{this.state.addressed}</div>
        }
    }

}
