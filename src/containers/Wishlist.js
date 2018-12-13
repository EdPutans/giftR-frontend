import React from 'react'
import Wish from '../components/Wish'
import { Button, Icon } from 'semantic-ui-react'

export default class Wishlist extends React.Component {

    render() {
        return (
        <div>
            {this.props.wishes.map(w => <Wish key={w.id} wish={w} user={this.props.currentUser}/> )  }
                <Button floated="right" style={ { position: 'absolute', right: '2em', bottom: '2em',textAlign: 'center' } }><Icon name="add"/></Button>
        </div>)
    }
}