import React from 'react'
import * as Adapter from '../Adapter'
import FriendNotification from '../components/FriendNotification'
import SantaNotification from '../components/SantaNotification'
import * as animate from '../Animations'
import * as Styles from '../Styles'



export default class NotificationList extends React.Component {

    state = {
        unacceptedFriendRequests: [],
        santas: []
    }


    componentDidMount = async () => {
        const unacceptedFriendRequests = await Adapter.getUnaccepted(this.props.currentUser.id)
        const resp = await Adapter.getUserSantas(this.props.currentUser.id)
        let santas = []
        if (resp.length > 0) {
            santas = resp.filter(s => !s.read)
        }
        return this.setState({ unacceptedFriendRequests, santas })
    }



    componentWillUnmount = async () => {

        const unacceptedFriendRequests = await Adapter.getUnaccepted(this.props.currentUser.id)
        const resp = await Adapter.getUserSantas(this.props.currentUser.id)
        let santas = []
        if (resp.length > 0) {
            santas = resp.filter(s => !s.read)
        }
        return this.setState({ unacceptedFriendRequests, santas })

    }

    handleAccept = async (friendship_id) => {
        return await Adapter.acceptOrRejectFriendRequest(friendship_id, 'confirmed')
    }

    handleReject = async (friendship_id) => {
        return await Adapter.acceptOrRejectFriendRequest(friendship_id, 'rejected')
    }

    mapUnaccepted = () => {
        return animate.fade(
            <div>
                { this.state.santas && this.state.santas.map(s =>
                    <SantaNotification
                        santa={ s }
                        handleClick={ this.pressedCool }
                    />) }
                { this.state.unacceptedFriendRequests && this.state.unacceptedFriendRequests.map(f =>
                    <div key={ f.id }>
                        <FriendNotification
                            refreshFriends={ this.props.refreshFriends }
                            currentUser={ this.props.currentUser }
                            friend={ f }
                            handleAccept={ this.handleAccept }
                            handleReject={ this.handleReject }
                        />
                    </div>) }
            </div>

        )
    }

    pressedCool = (id) => {
        let santas = [...this.state.santas]
        santas = santas.filter(s => s.id !== id)
        this.setState({ santas })
    }



    render() {
        const { santas, unacceptedFriendRequests } = this.state
        return (

            this.props.clicked && <div style={
                Styles.notification
            }
            >
                {
                    animate.fade(<div>
                        {
                            unacceptedFriendRequests.length === 0 && santas.length === 0 ? <h4>No new notifications</h4> : this.mapUnaccepted()
                        }
                    </div>
                    )
                }
            </div>
        )
    }
}
