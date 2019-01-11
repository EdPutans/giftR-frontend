import React from 'react'
import { Menu } from 'semantic-ui-react'
import * as Styles from '../Styles'


 export default class Navbar extends React.Component {


     

    render() {
        return (<div >
            <Menu fluid inverted color='black' 
                style={ Styles.navBar}
                >
                
                <Menu.Item   
                    color='teal'
                    icon="home"
                    active={ this.props.activeItem === "" }
                    onClick={() => this.props.handleItemClick("") }
                /> 
                <Menu.Item
                    icon="gift"
                    color='teal'
                    name='Secret Santa'
                    active={ this.props.activeItem === 'santa' }
                    onClick={ () => this.props.handleItemClick("santa") }
                />
                <Menu.Item
                    color='teal'
                    icon='list'
                    position='right'
                    // name='My list'
                    active={ this.props.activeItem === 'wishlist' }
                    onClick={ () => this.props.handleItemClick("wishlist") }
                />   
                <Menu.Item 
                    color='teal'
                    icon='users'
                    // name='Friends'
                    active={ this.props.activeItem === 'friends' }
                    onClick={() => this.props.handleItemClick("friends") }
                />
                <Menu.Item
                    
                    color='teal'
                    icon='bell'
                    active={ this.props.notificationsClicked === true }
                    onClick={ () => this.props.toggleNotificationsClicked() }
                />
                <Menu.Item 
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