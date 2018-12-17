import React from 'react'
import { Input, Button, Icon } from 'semantic-ui-react'
import * as adapter from '../Adapter'
import SearchArea from '../components/SearchArea'
// import Wish from '../components/Wish'

export default class HomePage extends React.Component {

    state={
        search: '',
        users: []
    }

    handleChange = (event) => {
        this.setState({ search: event.target.value })
    }
    
    
    findUsers = () =>{
        console.log('searching')
        return this.state.search && adapter.getUsersBySearchQuery(this.state.search)
            .then(users=>this.setState({users}))
    }


    handleSubmit = () => {
        console.log('clicked')
        this.findUsers()
    }

    render() {
        return (
            <div>
                <div style={ {
                    zIndex: 1,
                    paddingTop: "3em"
                } }>
                    <Input 
                        style={ { 
                            marginTop: '10em',                        width: '70%',
                            textAlign: 'center'
                        } } 
                        className='icon' 
                       
                        placeholder='Search users' 
                        onChange={event => this.handleChange(event) }
                        onSubmit={this.handleSubmit}
                    /> 
                    <Button >
                        <Icon onClick={ this.handleSubmit } name="search" />Search
                    </Button>
            </div>
                <SearchArea 
                    users={this.state.users}
                    search={this.state.search} 
                />
        </div>
        )
    }
}