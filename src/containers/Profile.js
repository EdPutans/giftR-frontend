import React from 'react'
import ProfileForm from './ProfileForm'
import ProfileShow from './ProfileShow'
import { Route } from 'react-router'
import Header from '../components/Header'
import * as animate from '../Animations'
import * as Styles from '../Styles'

export default class Profile extends
    React.Component {

    state = {
        editing: false
        // starts off empty and only tracks field data
    }

    toggleEdit = () => this.setState({ editing: !this.state.editing })


    logout = () => {
        this.props.logout()
        this.props.history.push('')
    }

    // pass different props to the function to sign up or to edit the user.

    render() {
        const { user } = this.props
        if (!this.state.editing) {
            return animate.fade(

                <div
                    style={ Styles.topSpace }
                >
                    <Header title={ "Profile" } />
                    <Route path='/profile'
                        component={ props =>
                            <ProfileShow
                                logout={ this.logout }
                                { ...props }
                                toggleEdit={ this.toggleEdit }
                                user={ user }
                            />
                        }
                    />
                </div>)
        } else {
            return (
                <div style={ Styles.topSpace } >
                    <Header title={ "Profile" } />
                    <Route path='/profile'
                        component={ props =>
                            <ProfileForm
                                { ...props }
                                updateUser={ this.props.setUser }
                                toggleEdit={ this.toggleEdit }
                                user={ user }
                            />
                        }
                    />
                </div>
            )
        }
    }
}