import React from 'react'
import ProfileForm from './ProfileForm'
import ProfileShow from './ProfileShow'
import {Route} from 'react-router'
import Header from '../components/Header'
import { Animate } from 'react-simple-animate'

export default class Profile extends 
React.Component {

    state = {
        editing: false
        // starts off empty and only tracks field data
    }

    animateMe = (component) => {
        return <Animate
            play={ true }
            startStyle={ { "opacity": 0 } }
            endStyle={ { "opacity": 1 } }
            durationSeconds="0.2"
            delaySeconds='0.1'
        >
            { component }
        </Animate>
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
            return this.animateMe(
            
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
        <div style={ { marginTop: '3em' } }>
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