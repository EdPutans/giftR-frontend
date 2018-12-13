import React from 'react'
import { Menu, Input } from 'semantic-ui-react'
 export default class Navbar extends React.Component {

state ={
    activeItem:''
}

     handleItemClick = (name) => {
         this.setState({ activeButton: name })
         this.props.history.push(`/${name}`)
     }

    render() {
        return (<div>
            <Menu inverted>
                <Menu.Item                    name='home'
                    active={ this.state.activeItem === 'home' }
                    onClick={() => this.handleItemClick("home") }
                />
                <Input className='icon' icon='search' placeholder='Search...' />
                <Menu.Item
                    name='friends'
                    active={ this.state.activeItem === 'friends' }
                    onClick={() => this.handleItemClick("friends") }
                />
                <Menu.Item name='Secret Santa' active={ this.state.activeItem === 'Secret Santa' } onClick={() => this.handleItemClick("secret_santa") } />
                <Menu.Item
                    name='profile'
                    active={ this.state.activeItem === 'profile' }
                    onClick={() => this.handleItemClick("profile") }
                />    
                )) }
            </Menu>
        </div>)
    }
}