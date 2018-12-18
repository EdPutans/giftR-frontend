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
                    paddingTop: "3em",
                    paddingBottom: "6em"
                } }>
                    { this.props.gifts.length>0 ? this.props.gifts
                        .sort((a, b) => parseInt(a.price) - parseInt(b.price))
                        .map(w => <Wish key={ w.id } wish={ w } user={ user } />) : <div style={ { marginTop: '5em' } }><h4>No wishes were made yet</h4></div>}
                    <div>
                        { this.props.search ?
                            <Button
                                className="circular"
                                color="teal"
                                onClick={ this.props.resetUser}
                                style={ {
                                    position: 'fixed',
                                    marginLeft: 'calc(50% - 98px)',
                                    bottom: '1em',
                                    textAlign: 'center'
                                } }
                            >
                                <h5>← back to search resullts </h5>
                            </Button>
                            :
                            <Button
                                className="circular"
                                circular
                                color="red"
                                onClick={ this.createWish }
                                style={ {
                                    marginLeft: 'calc(50% - 26px)',
                                    position: 'fixed',
                                    bottom: '0.5em',
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