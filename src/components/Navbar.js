import React from 'react'
import { Menu } from 'semantic-ui-react'
 export default class Navbar extends React.Component {


     

    render() {
        return (<div >
            <Menu fluid inverted color='black' 
                style={ {position: 'fixed', zIndex: "100", overflow: 'hidden'} }>
                
                <Menu.Item   
                    // style={ {width:"12%"}}
                    color='teal'
                    icon="home"
                    active={ this.props.activeItem === "" }
                    onClick={() => this.props.handleItemClick("") }
                /> 
                <Menu.Item 
                    // style={ { width:"22%"} }
                    color='teal'
                    icon='users'
                    name='friends'
                    active={ this.props.activeItem === 'friends' }
                    onClick={() => this.props.handleItemClick("friends") }
                />
                {/* <Menu.Item 
                    // style={ { width:"22%" } }
                    icon="gift"
color='teal'
                    name='Secret Santa' 
                    active={ this.props.activeItem === 'santa' } 
                    onClick={ () => this.props.handleItemClick("santa") } 
                /> */}
                <Menu.Item 
                    color='teal'
                    icon='list'
                    name='My wishlist'
                    active={ this.props.activeItem === 'wishlist' }
                    onClick={ () => this.props.handleItemClick("wishlist") }
                />    
                <Menu.Item
                    position='right'
                    color='teal'
                    icon='bell'
                    active={ this.props.notificationsClicked === true }
                    onClick={ () => this.props.toggleNotificationsClicked() }
                />
                <Menu.Item 
                    // style={ { width: "22%" } }
                    color='teal'
                    icon='user'
                    floated='right'
                    active={ this.props.activeItem === 'profile' }
                    onClick={ () => this.props.handleItemClick("profile") }
                />
            </Menu>
        </div>)
    }
}