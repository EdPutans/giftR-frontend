import React from 'react'
import Wish from '../components/Wish'
import { Button, Icon } from 'semantic-ui-react'

export default class Wishlist extends React.Component {


    handleClick =() => this.props.history.push('/new_wish')
    render() {
        let currentUser = this.props.currentUser 
        if (this.props.currentUser && this.props.gifts){
            return (
            <div style={{
                zIndex:1, 
                paddingTop: "3em"
            }}>
                { this.props.gifts
                        .sort((a, b) => parseInt(a.price) - parseInt(b.price) )
                    .map(w => <Wish key={ w.id } wish={ w } user={ currentUser } />) }
                <div> <br /> <br ></br>
                        <Button
                            className="circular"
                            color="teal"
                            onClick={this.handleClick}
                            floated="right"
                            style={ {
                                position: 'fixed',
                                right: '1em',
                                bottom: '1em',
                                textAlign: 'center'
                            } }
                        >
                            <h1>+</h1>
                        </Button>
                </div>
            </div>)
        } 
    }
}