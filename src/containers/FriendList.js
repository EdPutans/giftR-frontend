import React from 'react'
import { Card } from 'semantic-ui-react'
import * as adapter from '../Adapter'
import FriendCard from '../components/FriendCard'
import Wishlist from './Wishlist'
import BodyBackgroundColor from 'react-body-backgroundcolor'


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
        console.log('setting state: ')
        
    //     return adapter.getFriends(this.props.currentUser.id)
    //         .then(resp => this.setState({ friends: (resp.friends) }))
    //         .then(() => console.log('setting state: ', this.props.friends))
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
        if (this.props.friends) {
            console.log(this.props.friends)
            return <BodyBackgroundColor backgroundColor='#F6CFCA'><div>
                <div style={ { marginTop: '10%' } }>
                    <Card.Group className="ui center aligned grid" itemsPerRow={ 2 } >
                        { this.props.friends.map(f =>
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
        if (this.props.friends && !this.state.selectedFriend) {
            return this.friendsExist()
        }
        if (!this.props.friends && !this.state.selectedFriend) {
            return this.noFriendsExist()
        }
        if (this.state.selectedFriend && this.props.friends) {
            return this.selectedFriend()
        }else{
            return <div>loading...</div>
        }
    }
}