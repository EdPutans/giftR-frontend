import React from 'react'
import * as Adapter from '../Adapter'
import { Button, Card, Feed} from 'semantic-ui-react'



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


    feed = () =>{
        const { friend } = this.props
        return(  
           <Feed>
               <Feed.Event>
                   <Feed.Label>
                       {/* <img src={friend.img_url || null} /> */}
                   </Feed.Label>
                   {friend.user.first_name} {friend.user.last_name} invited you to become friends
             </Feed.Event>
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
           </Feed>
       )
    }



    render(){
        const { friend } = this.props
        if(!this.state.addressed){
            return( this.feed()
                // <div key={ friend.user.id }>{ friend.user.first_name } { friend.user.last_name } invited you to become friends
                //     <Button
                //         size='tiny'
                //         color='teal'
                //         onClick={ () => this.handleAccept(friend.friendship_id) }
                //     >
                //         Accept
                //     </Button>
                //     <Button
                //         size='tiny'
                //         color='red'
                //         onClick={ () => this.handleReject(friend.friendship_id) }
                //     >
                //         Reject
                //     </Button>
                // </div>
            )
        }else{
            return <div>{this.state.addressed}</div>
        }
    }

}
