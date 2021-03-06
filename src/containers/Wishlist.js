import React from 'react'
import Wish from '../components/Wish'
import { Button, Icon, Card } from 'semantic-ui-react'
import * as Adapter from '../Adapter'
import ProfileShow from './ProfileShow'
import Header from '../components/Header'
import * as animate from '../Animations'
import * as Styles from '../Styles'

export default class Wishlist extends React.Component {

    sendFriendRequest = async (currentUser_id, newFriend_id) => {

        await Adapter.friendRequest(currentUser_id, newFriend_id)
        await this.getActiveRequestIds(currentUser_id)
        await this.getUnacceptedIds(currentUser_id)
        return console.log('done rendering')
    }

    state = {
        unaccepted_ids: null,
        active_request_ids: null
    }

    getUnacceptedIds = async (id) => {
        const unaccepted_ids = await Adapter.getUnacceptedIds(id)
        return this.setState({ unaccepted_ids })
    }

    getActiveRequestIds = async (id) => {
        const active_request_ids = await Adapter.getActiveRequestIds(id)
        return this.setState({ active_request_ids })
    }

    componentDidMount = async () => {
        this.getUnacceptedIds(this.props.currentUser.id)
        this.getActiveRequestIds(this.props.currentUser.id)
    }

    renderCorrectButton = (id) => {
        if (this.state.unaccepted_ids && this.state.unaccepted_ids.find(digit => digit === id)) {
            return <div style={
                Styles.wishListMessageToUser
            }>
                <h5>You were added as a friend. Accept request from notifications.</h5>
            </div>
        }
        if (this.props.currentUser.id === this.props.user.id) { return; }
        if (this.state.active_request_ids && this.state.active_request_ids.find(digit => digit === id)) {
            return <div style={
                Styles.wishListMessageToUser
            }>
                <h5>Friend request sent</h5>
            </div>
        }

        return this.props.friends && !this.props.friends.find(u => u.id === id) ?
            <div style={ Styles.wishListMessageToUser }>
                <Button
                    basic
                    color='teal'
                    onClick={ () => this.sendFriendRequest(this.props.currentUser.id, this.props.user.id) }
                >
                    Add friend
                </Button>
            </div>
            :
            !this.props.currentUser.id !== this.props.user.id && <div>
                <div style={ Styles.wishListMessageToUser }>
                    <img
                        alt='green tick'
                        src='https://us.123rf.com/450wm/stas11/stas111706/stas11170600111/80189104-green-check-mark-icon-tick-symbol-in-green-color-vector-illustration.jpg?ver=6'
                        style={
                            Styles.greenTick
                        }
                    />
                    Already a mate
                </div>

            </div>
    }

    userProfile = () => {
        let id = this.props.user.id
        return (
            <div>
                <ProfileShow
                    user={ this.props.user }
                />
                { this.renderCorrectButton(id) }
            </div>
        )
    }

    renderButton = () => {
        return this.props.search ?
            <Button
                className="circular"
                color="teal"
                onClick={ this.props.resetUser }
                style={ Styles.returnButton }
            >
                <Icon name='angle left' /> Go back
        </Button>
            :
            <Button
                className="circular"
                circular
                color="red"
                onClick={ this.createWish }
                style={ Styles.plusButton }
            >
                <h1>+</h1>
            </Button>

    }



    createWish = () => this.props.history.push('/new_wish')

    render() {
        let user = this.props.user ? this.props.user : this.props.currentUser
        if (user && this.props.gifts) {
            return animate.fade(
                <div>
                    <div style={ Styles.listDiv }>



                        { this.props.search && this.userProfile() }
                        <Header
                            title={
                                this.props.search ? `${user.first_name}'s wishlist`
                                    :
                                    'My wishlist'
                            } />
                        <Card.Group className="ui center aligned grid" itemsPerRow={ 2 } style={ Styles.noRightMargin } >

                            { this.props.gifts.length > 0 ? this.props.gifts
                                .sort((a, b) => parseInt(a.price) - parseInt(b.price))
                                .map(w =>
                                    <Wish
                                        deleteWishFromDB={ this.props.deleteWishFromDB }
                                        deleteWish={ this.props.deleteWish }
                                        key={ w.id }
                                        wish={ w }
                                        currentUser={ this.props.currentUser }
                                        user={ user }
                                    />)
                                :
                                <div
                                    style={
                                        Styles.topSpace
                                    }>
                                    <h4>No wishes were made yet</h4>
                                </div> }

                        </Card.Group>

                    </div >
                    <div style={ Styles.left1em }>
                        { this.renderButton() }
                    </div>
                </div>

            )
        }
    }
}