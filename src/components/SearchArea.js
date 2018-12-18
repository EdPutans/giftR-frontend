import React from 'react'
import { Card } from 'semantic-ui-react'
import Wishlist from '../containers/Wishlist'

export default class SearchArea extends React.Component {

    // state={
    //     selectedUser: null
    // }

    // selectUser = (user) => {
    //     console.log(user)
    //     this.setState({ selectedUser: user })

    // }

    // resetUser =() => {
    //     this.setState({selectedUser: null})
    //     console.log('reset: ', this.state.selectUser)
    // }

    render() {
        // if (this.state.selectedUser){
        //     return(
        //         <div>
        //             <Wishlist 
        //                 resetUser={this.resetUser}
        //                 currentUser={this.state.selectedUser}
        //                 search={true}
        //                 gifts={this.state.selectedUser.gifts}
        //             />
        //         </div>
        //     )
        // }
        // if (!this.state.selectedUser){
            return (<div>
                { this.props.users && this.props.users.map(u =>
                    <div style={
                        {
                            zIndex: 1,
                            paddingTop: "1em"
                        }
                    }>
                        <Card 
                            onClick={ () => this.props.selectUser(u) }
                            fluid
                            header={ (u.first_name ? u.first_name : "") + ' ' + (u.last_name ? u.last_name : "") }
                            meta={ u.gifts.length + " wishes" }
                        />
                    </div>
                ) }
            </div>)
        // }
    }
}