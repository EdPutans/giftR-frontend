import React from 'react'
import { Menu } from 'semantic-ui-react'
 export default class Navbar extends React.Component {


     

    render() {
        return (<div >
            <Menu fluid 
                style={ {position: 'fixed', zIndex: "100", overflow: 'hidden'} }>
                
                <Menu.Item   
                    style={ {width:"12%"}}
                    icon="home"
                    color ='red'
                    active={ this.props.activeItem === "" }
                    onClick={() => this.props.handleItemClick("") }
                /> 
                <Menu.Item 
                    style={ { width:"22%"} }
                    icon='users'
                    // name='friends'
                    color='red'
                    active={ this.props.activeItem === 'friends' }
                    onClick={() => this.props.handleItemClick("friends") }
                />
                {/* <Menu.Item 
                    style={ { width:"22%" } }
                    icon="gift"

                    // name='Secret Santa' 
>>>>>>> a2442f24f2819ff97660a641b48ad2baab60aba3
                    color='red'
                    active={ this.props.activeItem === 'santa' } 
                    onClick={ () => this.props.handleItemClick("santa") } 
                /> */}
                <Menu.Item 
                    style={ { width:"22%" } }
                    icon='list'
                    // name='My wishlist'
                    color='red'
                    active={ this.props.activeItem === 'wishlist' }
                    onClick={ () => this.props.handleItemClick("wishlist") }
                />    
                <Menu.Item 
                    style={ { width: "22%" } }
                    icon='user'
                    // name='profile'
                    color='red'
                    active={ this.props.activeItem === 'profile' }
                    onClick={ () => this.props.handleItemClick("profile") }
                />
            </Menu>
        </div>)
    }
}