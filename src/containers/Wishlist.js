import React from 'react'
import Wish from '../components/Wish'
import { Button, Icon, Card, Item } from 'semantic-ui-react'

import ProfileShow from './ProfileShow'
import Header from '../components/Header'
export default class Wishlist extends React.Component {



    sendFriendRequest=()=>{
        
    }





    userProfile=()=>{
        let id = this.props.currentUser.id
        return (
            <div>
                <ProfileShow 
                    user={this.props.currentUser}
                />
                { this.props.friends && !this.props.friends.find(u => u.id === id) ? <Button onClick={this.sendFriendRequest}>Add friend</Button> : 'Already a mate'  }
            </div>
        )
    }

    renderButton = () => {
        return this.props.search ?
        <Button
            className="circular"
            color="teal"
            onClick={ this.props.resetUser }
            style={ {
                position: 'fixed',
                marginLeft: 'calc(50% - 56px)',
                margin: 'auto',
                bottom: '1em',
                textAlign: 'center'
            } }
        >
            <Icon name='angle left' /> Go back
        </Button>
        :
        <Button
            className="circular"
            circular
            // floated="right"
            color="red"
            onClick={ this.createWish }
            style={ {
                // left: 'calc(50% - 26px)',
                right: '1 0px',
                position: 'fixed',
                top: '90%',
                // right: '1em',
                // textAlign: 'center'
            } }
        >
            <h1>+</h1>
        </Button>

    }       



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
                    <Header 
                        title={
                            this.props.search? `${user.first_name}'s wishlist`
                            :
                            'My wishlist'
                            } />


                    { this.props.search && this.userProfile() }
                    <Card.Group className="ui center aligned grid" itemsPerRow={2} >
                    { this.props.gifts.length > 0 ? this.props.gifts
                        .sort((a, b) => parseInt(a.price) - parseInt(b.price))
                        .map(w =>
                            <Wish
                                deleteWishFromDB={ this.props.deleteWishFromDB }
                                deleteWish={ this.props.deleteWish }
                                key={ w.id }
                                wish={ w }
                                user={ user }
                            />) 
                        :
                        <div
                            style={
                                {
                                    marginTop: '5em'
                                }
                            }>
                            <h4>No wishes were made yet</h4>
                        </div> }
                    
                </Card.Group>
                    { this.renderButton() }
                </div>
                
             )
        }
    }
}