import React from 'react'
import { Input, Button, Icon } from 'semantic-ui-react'
import * as adapter from '../Adapter'
import SearchArea from '../components/SearchArea'
import Wishlist from '../containers/Wishlist'
import BodyBackgroundColor from 'react-body-backgroundcolor'
import ProfileShow from './ProfileShow'

// import Wish from '../components/Wish'

export default class HomePage extends React.Component {

    state={
        search: '',
        users: [],
        selectedUser: null,
    }

    selectUser = (user) => {  
        this.setState({ selectedUser: user })
    }

    resetUser = () => {
        this.setState({ selectedUser: null })        
    }

    userProfile = () => {
        return (
            <ProfileShow
                user={ this.state.selectedUser }
            />
        )
    }

    handleChange = (event) => {
        this.setState({ search: event.target.value })
    }
        
    findUsers = () =>{ 
        return this.state.search && adapter.getUsersBySearchQuery(this.state.search)
            .then(users=>{
              return  !users.error && this.setState({users})
            })
    }

    backToWelcome=()=>this.props.history.push('')
    
    handleSubmit = () => {
        this.findUsers()
    }

    renderSelectedUser=()=>{
        return (<BodyBackgroundColor backgroundColor='#F6CFCA'>
            <div>
                <Wishlist
                    friends={this.props.friends}
                    resetUser={ this.resetUser }
                    currentUser={ this.state.selectedUser }
                    search={ true }
                    gifts={ this.state.selectedUser.gifts }
                />
            </div></BodyBackgroundColor>
        )
    }

    renderUserList=()=>{
        return (<BodyBackgroundColor backgroundColor='#F6CFCA'>
            <div>
                <div style={ {
                    zIndex: '1',
                    padding: "3em auto 3em auto "
                } }>
                <div 
                    style={{display:'flex', marginTop: '1em', marginBottom: '1em'}}
                >
                    <Input
                        style={ {
                            width: '60%',
                            marginLeft: '10%'
                        } }
                        className='icon'
                        placeholder='Search users'
                        onChange={ event => this.handleChange(event) }
                        onSubmit={ this.handleSubmit }
                    />
                    <Button type="submit" float onClick={ this.handleSubmit }>
                        <Icon name="search" />Search
                    </Button>
                    </div>
                </div>
                <div style={ {
                    width: '20%',
                    zIndex: '1',
                    paddingTop: "1em"
                } }>
                </div>
                <SearchArea
                    friends={ this.props.friends }
                    selectUser={ this.selectUser }
                    users={ this.state.users }
                    search={ this.state.search }
                />
            </div></BodyBackgroundColor>
        )
    }

    render() {
        if (this.state.selectedUser) {
            return this.renderSelectedUser()
        }else{
           return this.renderUserList()
        }
    }
}