import React from 'react'
import { Menu } from 'semantic-ui-react'
 export default class Navbar extends React.Component {


    

    render() {
        return (<div>
            <Menu fluid>
                <Menu.Item   
                    style={ {width:"12%"}}
                    icon="home"
                    active={ this.props.activeItem === 'home' }
                    onClick={() => this.props.handleItemClick("home") }
                /> 
                <Menu.Item style={ { width:"22%" } }
                    name='friends'
                    active={ this.props.activeItem === 'friends' }
                    onClick={() => this.props.handleItemClick("friends") }
                />
                <Menu.Item style={ { width:"22%" } }
                    name='Secret Santa' 
                    active={ this.props.activeItem === 'santa' } 
                    onClick={ () => this.props.handleItemClick("santa") } 
                />
                <Menu.Item style={ { width:"22%" } }
                    name='My wishlist'
                    active={ this.props.activeItem === 'wishlist' }
                    onClick={ () => this.props.handleItemClick("wishlist") }
                />    
                <Menu.Item style={ { width: "22%" } }
                    name='profile'
                    active={ this.props.activeItem === 'profile' }
                    onClick={ () => this.props.handleItemClick("profile") }
                />
            </Menu>
        </div>)
    }
}