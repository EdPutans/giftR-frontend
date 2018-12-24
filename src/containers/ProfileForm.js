import React from 'react'
import { Form, Button, Label, Segment } from 'semantic-ui-react'
import * as adapter from '../Adapter'
import BodyBackgroundColor from 'react-body-backgroundcolor'

export default class ProfileForm extends React.Component {

    state={

    }

    checkPasswordFields = () => {
        const { new_password, repeat_password } = this.state
        return new_password === repeat_password ? true : false
    }

    checkForPasswordPresense = () => {
        return this.state.old_password ? true : false
    }

    handleSubmit = () => {
        if (this.checkPasswordFields() && this.checkForPasswordPresense()) {
            const { first_name, last_name, email, age, old_password, new_password, repeat_password } = this.state
            let user = this.props.user
            let updatedUser = {}

            updatedUser.id = this.props.user.id
            updatedUser.age = age ? age : user.age
            updatedUser.first_name = first_name ? first_name : user.first_name
            updatedUser.last_name = last_name ? last_name : user.last_name
            updatedUser.email = email ? email : user.email
            updatedUser.old_password = old_password
            updatedUser.password = new_password

            adapter.updateUserById(updatedUser)
                .then(r => {

                    if(r.error){alert('Incorrect current password.')}
                    else{
                        this.props.toggleEdit()
                        this.props.updateUser(r)
                    }
                        
                })
        } else {
            alert("Please check your password fields.")
        }
    }

    handleChange = (value, type) => {
        switch (type) {
            case "first_name":
                return this.setState({ first_name: value })
            case "last_name":
                return this.setState({ last_name: value })
            case "email":
                return this.setState({ email: value })
            case "age":
                return this.setState({ age: value })
            case "old_password":
                return this.setState({ old_password: value })
            case "new_password":
                return this.setState({ new_password: value })
            case "repeat_password":
                return this.setState({ repeat_password: value })
            default:
                return null
        }
    }


    render() {
        const { user } = this.props
        return (
            <BodyBackgroundColor backgroundColor='#F6CFCA'>
                <div style={ {
                    zIndex: 1,
                    // paddingTop: "4em"
                } }>
                    <Form
                        style={ {
                            // marginTop: '10%',
                            width: '80%',
                            marginLeft: '10%'
                        } }
                    ><br />

                        <Form.Field>
                            { !this.checkForPasswordPresense() && <Label>Note: current password required to save changes.</Label> }
                            <input style={ { marginTop: '15px' } }
                                onChange={ event => this.handleChange(event.target.value, "first_name") }
                                placeholder={ 'First name: ' + user.first_name }
                                maxLength="20" />
                        </Form.Field>
                        <Form.Field>
                            <input onChange={ event => this.handleChange(event.target.value, "last_name") } placeholder={ "Last Name: " + user.last_name } maxLength="30" />
                        </Form.Field>
                        <Form.Field>
                            <input onChange={ event => this.handleChange(event.target.value, "email") } placeholder={ "Email: " + user.email } type="text" maxLength="30" />
                        </Form.Field>
                        <Form.Field>
                            <input type="number" step={ 1 } onChange={ event => this.handleChange(event.target.value, "age") } placeholder={ "Age: " + user.age } maxLength="3" />
                        </Form.Field>
                        <Form.Field>

                            <input type="password" onChange={ event => this.handleChange(event.target.value, "old_password") } placeholder='Current password' />
                        </Form.Field>
                        <Form.Field>
                            <input onChange={ event => this.handleChange(event.target.value, "new_password") } placeholder='New password' type="password" />
                        </Form.Field>
                        <Form.Field>
                            <input type="password" onChange={ event => this.handleChange(event.target.value, "repeat_password") } placeholder='Repeat password' />
                        </Form.Field>



                        <Button onClick={ this.handleSubmit } color='teal' floated='right' type='submit'>Save</Button>
                        <Button onClick={ this.props.toggleEdit } color='red' basic type='submit'>Cancel</Button>


                    </Form>
                    { !this.props.user && <a href="/login">Already a member? Log in here!</a> }
                </div></BodyBackgroundColor>

        )
    }
}