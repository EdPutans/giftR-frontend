import React from 'react'
import { Input, Button, Icon, Form } from 'semantic-ui-react'
import * as adapter from '../Adapter'
import SearchArea from '../components/SearchArea'
import Wishlist from '../containers/Wishlist'
import ProfileShow from './ProfileShow'
import * as animate from '../Animations'
import * as Styles from '../Styles'


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
        return (
            <div>
                <Wishlist
                        friends={this.props.friends}
                        resetUser={ this.resetUser }
                        currentUser={ this.props.currentUser }
                        user={ this.state.selectedUser }
                        search={ true }
                        gifts={ this.state.selectedUser.gifts }
                    />
            </div>
        )
    }


    renderUserList=()=>{
        return (
            animate.fade(
            <div style={Styles.listDiv}>
                <h1>Welcome to GiftR!</h1><br/>
                <h5>Start by looking up a person or creating your very own wishlist!</h5>
                <div style={ Styles.betweenTwo3ems }>
                <div 
                    style={Styles.betweenTwo1ems}
                >
                <Form>
                    <Input  
                        className='icon'
                        placeholder='Search users'
                        onChange={ event => this.handleChange(event) }
                        onSubmit={ this.handleSubmit }
                    />
                    <Button
                        type="submit"
                        onClick={ this.handleSubmit }
                    >
                        <Icon name="search" />Search
                    </Button>
                        </Form>
                    </div>
                </div>
                <div
                 style={ {
                    width: '20%',
                    zIndex: '1',
                    paddingTop: "1em"
                } }
                >
                </div>
                {animate.list(<SearchArea
                    friends={ this.props.friends }
                    selectUser={ this.selectUser }
                    users={ this.state.users }
                    search={ this.state.search }
                />)}
                
            </div>)
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