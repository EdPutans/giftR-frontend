import React from 'react'
import Wish from '../components/Wish'
import { Button } from 'semantic-ui-react'

export default class Wishlist extends React.Component {


    createWish = () => this.props.history.push('/new_wish')
    
    render() {
        let user = this.props.currentUser
        if (user && this.props.gifts) {
            return (
                <div style={ {
                    zIndex: 1,
                    paddingTop: "3em"
                } }>
                    { this.props.gifts
                        .sort((a, b) => parseInt(a.price) - parseInt(b.price))
                        .map(w => <Wish key={ w.id } wish={ w } user={ user } />) }
                    <div> <br /><br /><br /><br /><br /><br />
                        { this.props.search ?
                            <Button
                                className="circular"
                                color="teal"
                                onClick={ this.props.resetUser}
                                style={ {
                                    position: 'fixed',
                                    left: '1em',
                                    bottom: '1em',
                                    textAlign: 'center'
                                } }
                            >
                                <h1>←</h1>
                            </Button>
                            :
                            <Button
                                className="circular"
                                color="teal"
                                onClick={ this.createWish }
                                style={ {
                                    position: 'fixed',
                                    right: '1em',
                                    bottom: '1em',
                                    textAlign: 'center'
                                } }
                            >
                                <h1>+</h1>
                            </Button>

                        }
                    </div>
                </div>)
        }
    }
}