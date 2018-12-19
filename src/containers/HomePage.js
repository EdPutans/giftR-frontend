import React from 'react'
import { Input, Button, Icon } from 'semantic-ui-react'
import * as adapter from '../Adapter'
import SearchArea from '../components/SearchArea'
import Wishlist from '../containers/Wishlist'
import BodyBackgroundColor from 'react-body-backgroundcolor'

// import Wish from '../components/Wish'

export default class HomePage extends React.Component {

    state={
        search: '',
        users: [],
        selectedUser: null,
    }

    selectUser = (user) => {
        console.log(user)
        this.setState({ selectedUser: user })

    }

    resetUser = () => {
        this.setState({ selectedUser: null })
        console.log('reset: ', this.state.selectUser)
    }




    handleChange = (event) => {
        this.setState({ search: event.target.value })
    }
    
    
    findUsers = () =>{
        console.log('searching')
        return this.state.search && adapter.getUsersBySearchQuery(this.state.search)
            .then(users=>{
              return  !users.error && this.setState({users})
            })
    }

    backToWelcome=()=>this.props.history.push('')

    handleSubmit = () => {
        console.log('clicked')
        this.findUsers()
    }

    render() {
        if (this.state.selectedUser) {
            return (<BodyBackgroundColor backgroundColor='#F6CFCA'>
                <div>
                    <Wishlist
                        resetUser={ this.resetUser }
                        currentUser={ this.state.selectedUser }
                        search={ true }
                        gifts={ this.state.selectedUser.gifts }
                    />
                </div></BodyBackgroundColor>
            )
        }else{
            return (<BodyBackgroundColor backgroundColor='#F6CFCA'>
                <div>
                    <div style={ {
                        zIndex: 1,
                        paddingTop: "3em"
                    } }>
                        <Input 
                            style={ { 
                                marginTop: '1em',
                                width: '60%',
                                marginLeft: '10%'
                            } } 
                            className='icon' 
                            placeholder='Search users' 
                            onChange={event => this.handleChange(event) }
                            onSubmit={this.handleSubmit}
                        /> 
                        <Button type="submit" float onClick={ this.handleSubmit }>
                            <Icon name="search" />Search
                        </Button>
                </div>
                    <div style={ {
                        width:'20%',
                        zIndex: 1,
                        paddingTop: "1em"
                    } }>
                </div>
                    <SearchArea 
                        selectUser={this.selectUser}
                        users={this.state.users}
                        search={this.state.search} 
                    />   
                </div></BodyBackgroundColor>
            )
        }
    }
}