import React from 'react'
import Wish from '../components/Wish'
import { Button, Icon } from 'semantic-ui-react'

export default class Wishlist extends React.Component {


    handleClick =() => this.props.history.push('/new_wish')
    render() {
        return (
            <div>
                { this.props.wishes.map(w => <Wish key={ w.id } wish={ w } user={ this.props.currentUser } />) }
                <div>
                        <Button
                            className="circular"
                            color="teal"
                            onClick={this.handleClick}
                            floated="right"
                            style={ {
                                position: 'absolute',
                                right: '2em',
                                bottom: '2em',
                                textAlign: 'center'
                            } }
                        >
                            <h1>+</h1>
                        </Button>
                </div>
            </div>)
    }
}