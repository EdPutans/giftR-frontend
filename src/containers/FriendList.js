import React from 'react'
import { Card } from 'semantic-ui-react'
import FriendCard from '../components/FriendCard'
import Wishlist from './Wishlist'
import Header from '../components/Header'
import * as Styles from '../Styles'


export default class HomePage extends React.Component {

    state = {
        friends: [],
        selectedFriend: null
    }


    toggleSelectFriend = (selectedFriend) => {
        !this.state.selectedFriend ?
            this.setState({ selectedFriend })
            :
            this.setState({ selectedFriend: null })
    }


    componentDidMount() {
        this.props.friends && this.props.friends.length > 0 ? this.setState({ friends: this.props.friends }) : this.setState({ friends: [] })
       
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
        return <div style={ Styles.topSpace }>
            <Header title={ 'Friends' } />
             <h5 style={Styles.centerBlock}>
                No friends added yet
            </h5>
        </div>
    }

    friendsExist = () => {
        if (this.state.friends) {
            return <div>
                <div style={ Styles.topSpace }>
                    <Header title={'Friends'} />
                    <Card.Group className="ui center aligned grid" itemsPerRow={ 2 } 
                    style={Styles.noRightMargin}
                    >
                        { this.state.friends.map(f =>
                            <FriendCard
                                key={f.id}
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
        if (this.state.friends.length > 0 && !this.state.selectedFriend) {
            return this.friendsExist()
        }
        if (this.state.friends.length < 1 && !this.state.selectedFriend) {
            return this.noFriendsExist()
        }
        if (this.state.friends.length > 0 && this.state.selectedFriend ) {
            return this.selectedFriend()
        }else{
            return <div>loading...</div>
        }
    }
}