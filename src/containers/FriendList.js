import React from 'react'
import { Card } from 'semantic-ui-react'
import * as adapter from '../Adapter'
import FriendCard from '../components/FriendCard'
import Wishlist from './Wishlist'
import BodyBackgroundColor from 'react-body-backgroundcolor'


export default class HomePage extends React.Component {

    state = {
        friends: null,
        selectedFriend: null
    }


    toggleSelectFriend = (selectedFriend) => {
        !this.state.selectedFriend ?
            this.setState({ selectedFriend })
            :
            this.setState({ selectedFriend: null })
    }


    componentDidMount() {
        console.log('setting state: ')
        return adapter.getFriends(this.props.currentUser.id)
            .then(resp => this.setState({ friends: (resp.friends) }))
            .then(() => console.log('setting state: ', this.state.friends))
    }



    selectedFriend = () => {
        console.log('eeee', this.state.selectedFriend)
        return (<BodyBackgroundColor backgroundColor='#F6CFCA'>
            <Wishlist
                resetUser={ this.toggleSelectFriend }
                currentUser={ this.state.selectedFriend }
                gifts={ this.state.selectedFriend.wishes }
                search={ true }
            /></BodyBackgroundColor>
        )
    }


    noFriendsExist = () => {
        return <BodyBackgroundColor backgroundColor='#F6CFCA'><div> No friends added yet</div></BodyBackgroundColor>
    }

    friendsExist = () => {
        if (this.state.friends) {
            console.log(this.state.friends)
            return <BodyBackgroundColor backgroundColor='#F6CFCA'><div>
                <div style={ {
                    marginTop: '3em',
                    zIndex: 1,
                    paddingTop: "3em",
                    paddingBottom: "6em"
                } }>
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
            </BodyBackgroundColor>
        }
    }


    render() {
        if (this.state.friends && !this.state.selectedFriend) {
            return this.friendsExist()
        }
        if (!this.state.friends && !this.state.selectedFriend) {
            return this.noFriendsExist()
        }
        if (this.state.selectedFriend) {
            return this.selectedFriend()
        }
    }
}