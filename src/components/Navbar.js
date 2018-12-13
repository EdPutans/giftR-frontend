import React from 'react'
import { Menu, Input } from 'semantic-ui-react'
 export default class Navbar extends React.Component {


     

    render() {
        return (<div>
            <Menu inverted>
                <Menu.Item   
                    name='home'
                    active={ this.props.activeItem === 'home' }
                    onClick={() => this.props.handleItemClick("home") }
                />
                <Input className='icon' icon='search' placeholder='Search...' />
                <Menu.Item
                    name='friends'
                    active={ this.props.activeItem === 'friends' }
                    onClick={() => this.props.handleItemClick("friends") }
                />
                <Menu.Item 
                    name='Secret Santa' 
                    active={ this.props.activeItem === 'Secret Santa' } 
                    onClick={() => this.props.handleItemClick("secret_santa") } 
                />
                <Menu.Item
                    name='profile'
                    active={ this.props.activeItem === 'profile' }
                    onClick={() => this.props.handleItemClick("profile") }
                />
                <Menu.Item
                    name='wishlist'
                    active={ this.props.activeItem === 'wishlist' }
                    onClick={ () => this.props.handleItemClick("wishlist") }
                />    
                )) }
            </Menu>
        </div>)
    }
}