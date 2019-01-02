import React from 'react'
import * as Adapter from '../Adapter'
import {Card} from 'semantic-ui-react'
import Header from './Header'
import Wishlist from '../containers/Wishlist'
import ProfileShow from '../containers/ProfileShow'
export default class SantaList extends React.Component {

    state={
        users: [],
        selectedUser: null
    }

    selectUser = (userr) => {
        Adapter.getUser(userr.id).then(user => {
            this.setState({ selectedUser: user })
        })
        
    }

    resetUser = () => {
        this.setState({ selectedUser: null })
    }

    userProfile = (id) => {
        
            return (
                <div>
                    <Wishlist
                        friends={ this.props.friends }
                        resetUser={ this.resetUser }
                        currentUser={ this.props.currentUser }
                        user={ this.state.selectedUser }
                        search={ true }
                        gifts={ this.state.selectedUser.gifts }
                    />
                </div>
            )
       
        
    }

    componentDidMount = async () => {
        if(this.props.currentUser){
            const santas = await Adapter.getUserSantas(this.props.currentUser.id)
            if(!santas.error){
                const users = santas.map(s => { 
                    const {id, last_name, first_name, age, img_url} = s.receiver
                    const {deadline, budget} = s
                    return {id, last_name, first_name, age, img_url, deadline, budget}
                })
                this.setState({users})
            }
        }
       
    }

    formatDate=(date)=>{
        return `${date.split('-')[0].split(' ')[0]}-${date.split('-')[1]}-${date.split('-')[2].split('T')[0]}`
    }

    render(){
        const {users, selectedUser} = this.state
        
        if (!selectedUser) {
            return(
                <div style={ {
                    margin: 'auto auto auto 1em',
                } }>
                    {users.length>0 && <h3>Active Secret Santas:</h3>}
                    { users.length>0 && users.map(e =>
                        <Card
                            onClick={ () => this.selectUser(e) }
                            style={ {
                                textAlign: 'center',
                                margin: '1em auto',
                            } }
                            header={ `${e.first_name} ${e.last_name}` }
                            meta={ `Deadline on ${this.formatDate(e.deadline)}` }
                            description={ `Budget - £${e.budget}` }
                        />)
                    }

                </div>
            )}else{
                return this.userProfile(selectedUser.id)
            }
    }

}