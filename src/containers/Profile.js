import React from 'react'
import { Form, Button, Label, Segment } from 'semantic-ui-react'
import * as adapter from '../Adapter'
import BodyBackgroundColor from 'react-body-backgroundcolor'
import ProfileForm from './ProfileForm'
import ProfileShow from './ProfileShow'
import {Route} from 'react-router'
import Header from '../components/Header'


export default class Profile extends 
React.Component {

    state = {
        editing: false
        // starts off empty and only tracks field data
    }

    toggleEdit = () => this.setState({ editing: !this.state.editing }) 
    

    logout=()=>{
        this.props.logout()
        this.props.history.push('')
    }
    
    // pass different props to the function to sign up or to edit the user.

    render() {
        const {user} = this.props
        if(!this.state.editing){
            return (
            
            <div 
            style={{marginTop:'3em'}}
            >
                    <Header title={ "Profile" } />
                <Route path='/profile'
                    component={props => 
                    <ProfileShow
                        logout={ this.logout }
                        {...props}
                        toggleEdit={this.toggleEdit}
                        user={user} 
                    />
                } 
                />
            </div> )
        }else{
            return (
            <div>
             <Header title={ "Profile" } />
             <Route path='/profile'
                 component={ props =>
                     <ProfileForm 
                         { ...props }
                         updateUser={this.props.setUser}
                         toggleEdit={ this.toggleEdit }
                         user={ user }
                     />
                 }
             />
            </div>
        )
    }}
}