import React from 'react'
import { Card } from 'semantic-ui-react'
import * as animate from '../Animations'
import * as Styles from '../Styles'

// div with key had a styling : minWidth:375px, marginTop: 1em, zindex: 1 , paste back in if necessary


export default class SearchArea extends React.Component {

    isFriend=(id)=>{
        if(this.props.friends){
            let friend = this.props.friends.find(friend => friend.id === id)
            return  friend  ? "In your friends list" : "not a friend yet"
        }
    }



    render() {
            return (<div style={Styles.betweenTwo1ems}>
            
                <Card.Group className="ui center aligned grid">
                { this.props.users && this.props.users.map(u =>
                    <div key={u.id}
                        style={ Styles.searchCard}>
                        {animate.list(<Card
                            key={u.id}
                            fluid
                            onClick={ () => this.props.selectUser(u) }
                            header={(u.first_name ? u.first_name : "") + ' ' + (u.last_name ? u.last_name : "") }
                            meta={ u.gifts.length + " wish(es)" }
                            description={this.isFriend(u.id)}
                        />)}
                        
                    </div>
                ) }
                
                </Card.Group>
                
            </div>)
        // }
    }
}