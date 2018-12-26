import React from 'react'
import { Card } from 'semantic-ui-react'
import * as adapter from '../Adapter'
import FriendCard from '../components/FriendCard'
import Wishlist from './Wishlist'
import BodyBackgroundColor from 'react-body-backgroundcolor'
import Header from '../components/Header'

export default class HomePage extends React.Component {

    state = {
        // friends: null,
        selectedFriend: null
    }


    toggleSelectFriend = (selectedFriend) => {
        !this.state.selectedFriend ?
            this.setState({ selectedFriend })
            :
            this.setState({ selectedFriend: null })
    }


    componentDidMount() {
        this.setState({friends: this.props.friends})
       
// FRIENDS ARE BEING RENDERED  ON MAIN PAGE ATM
 
        // return adapter.getFriends(this.props.currentUser.id)
        //     .then(friends => this.setState({ friends }))
    }



    selectedFriend = () => {
        return  <Wishlist
                currentUser={this.props.currentUser}
                resetUser={ this.toggleSelectFriend }
                user={ this.state.selectedFriend }
                gifts={ this.state.selectedFriend.wishes }
                search={ true }
            />
        
    }


    noFriendsExist = () => {
        return <div> No friends added yet</div>
    }

    friendsExist = () => {
        if (this.state.friends) {
            return <div>
                <div style={ {
                    zIndex: 1,
                    paddingTop: "3em",
                    paddingBottom: "6em"
                } }>
                    <Header title={'Friends'} />
                    <Card.Group className="ui center aligned grid" itemsPerRow={ 2 } >
                        { this.state.friends.map(f =>
                            <FriendCard
                                friend={ f }
                                toggleSelectFriend={ this.toggleSelectFriend }
                            />
                        ) }
                    </Card.Group>
                </div>
            </div>
        }
    }


    render() {
        if (this.state.friends && !this.state.selectedFriend) {
            return this.friendsExist()
        }
        if (!this.state.friends && !this.state.selectedFriend) {
            return this.noFriendsExist()
        }
        if (this.state.selectedFriend && this.state.friends) {
            return this.selectedFriend()
        }else{
            return <div>loading...</div>
        }
    }
}