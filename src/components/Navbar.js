import React from 'react'
import { Menu, Input } from 'semantic-ui-react'
 export default class Navbar extends React.Component {


     

    render() {
        return (<div>
            <Menu fluid>
                <Menu.Item   
                    name='home'
                    active={ this.props.activeItem === 'home' }
                    onClick={() => this.props.handleItemClick("home") }
                /> 
                <Menu.Item
                    name='friends'
                    active={ this.props.activeItem === 'friends' }
                    onClick={() => this.props.handleItemClick("friends") }
                />
                <Menu.Item 
                    name='Santa' 
                    active={ this.props.activeItem === 'Santa' } 
                    onClick={ () => this.props.handleItemClick("Santa") } 
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
            </Menu>
        </div>)
    }
}