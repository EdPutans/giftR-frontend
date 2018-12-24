import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import Wishlist from '../containers/Wishlist'

export default class SearchArea extends React.Component {

    isFriend=(id)=>{
        let friend = this.props.friends.find(friend => friend.id == id)
        console.log('located, this guy is a friend:', friend)
        return  friend  ? "In your friends list" : "not a friend yet"
    }

    render() {
     console.log('search area friends:', this.props.friends)
            return (<div>
                <Card.Group className="ui center aligned grid">
                { this.props.users && this.props.users.map(u =>
                    <div style={
                        {
                            zIndex: 1,
                            paddingTop: "1em"
                        }
                    }>
                        <Card
                            key={u.id}
                            onClick={ () => this.props.selectUser(u) }
                            header={(u.first_name ? u.first_name : "") + ' ' + (u.last_name ? u.last_name : "") }
                            meta={ u.gifts.length + " wishes" }
                            description={this.isFriend(u.id)}
                        />
                    </div>
                ) }
                
                </Card.Group>
                
            </div>)
        // }
    }
}