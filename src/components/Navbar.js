import React from 'react'
import { Menu } from 'semantic-ui-react'
 export default class Navbar extends React.Component {


     

    render() {
        return (<div >
            <Menu fluid style={ {position: 'fixed', zIndex: "100"} }>
                <Menu.Item   
                    style={ {width:"12%"}}
                    icon="home"
                    color ='red'
                    active={ this.props.activeItem === "" }
                    onClick={() => this.props.handleItemClick("") }
                /> 
                <Menu.Item style={ { width:"22%"} }
                    name='friends'
                    color='red'
                    active={ this.props.activeItem === 'friends' }
                    onClick={() => this.props.handleItemClick("friends") }
                />
                <Menu.Item style={ { width:"22%" } }
                    name='Secret Santa' 
                    color='red'
                    active={ this.props.activeItem === 'santa' } 
                    onClick={ () => this.props.handleItemClick("santa") } 
                />
                <Menu.Item style={ { width:"22%" } }
                    name='My wishlist'
                    color='red'
                    active={ this.props.activeItem === 'wishlist' }
                    onClick={ () => this.props.handleItemClick("wishlist") }
                />    
                <Menu.Item style={ { width: "22%" } }
                    name='profile'
                    color='red'
                    active={ this.props.activeItem === 'profile' }
                    onClick={ () => this.props.handleItemClick("profile") }
                />
            </Menu>
        </div>)
    }
}