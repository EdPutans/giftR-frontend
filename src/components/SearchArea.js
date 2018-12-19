import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import Wishlist from '../containers/Wishlist'

export default class SearchArea extends React.Component {

    

    render() {
     
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
                            onClick={ () => this.props.selectUser(u) }
                            header={(u.first_name ? u.first_name : "") + ' ' + (u.last_name ? u.last_name : "") }
                            meta={ u.gifts.length + " wishes" }
                        />
                    </div>
                ) }
                
                </Card.Group>
                
            </div>)
        // }
    }
}