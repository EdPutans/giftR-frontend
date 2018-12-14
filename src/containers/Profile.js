import React from 'react'
import { Form, Button, Label } from 'semantic-ui-react'

export default class Profile extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        currentPassword: '',
        newPassword: '',
        repeatPassword: ''
    }

    checkPasswordFields = () => {
        const { password, repeat_password } = this.state
        return password === repeat_password ? true : false
    }


    handleSubmit = (user) => {
        const { firstName,lastName,email,age,currentPassword,newPassword,repeatPassword } = this.state
        user.age = age? age : user.age
        user.email = email ? email : user.email
        user.first_name = firstName ? firstName : user.first_name
        user.last_name = lastName ? lastName : user.last_name


        if(this.checkPasswordFields()){
            
            this.props.authenticate(email,currentPassword)

        }else{
            alert('Check your details')
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
            case "password":
                return this.setState({ password: value })
            case "repeat_password":
                return this.setState({ repeat_password: value })
            default:
                return null
        }
    }

    // pass different props to the function to sign up or to edit the user.

    render() {
        const {user} = this.props
        return (
            <div>
                <Form><br/>
                    <Label>Change only values you would like changed.</Label><br />
                    <Form.Field>
                        <input onChange={ event => this.handleChange(event.target.value, "first_name") } placeholder={user.first_name} />
                    </Form.Field>
                    <Form.Field>
                        <input onChange={ event => this.handleChange(event.target.value, "last_name") } placeholder={ user.last_name } />
                    </Form.Field>
                    <Form.Field>
                        <input onChange={ event => this.handleChange(event.target.value, "email") } placeholder={ user.email } type="email" />
                    </Form.Field>
                    <Form.Field>
                        <input type="number" step={ 1 } onChange={ event => this.handleChange(event.target.value, "age") } placeholder={ user.age } />
                    </Form.Field>
                    <Form.Field>
                        <input type="password" onChange={ event => this.handleChange(event.target.value, "repeat_password") } placeholder='Current password' />
                    </Form.Field>
                    <Form.Field>
                        <input onChange={ event => this.handleChange(event.target.value, "password") } placeholder='New password' type="password" />
                    </Form.Field>
                    <Form.Field>
                        <input type="password" onChange={ event => this.handleChange(event.target.value, "repeat_password") } placeholder='Repeat password' />
                    </Form.Field>
                    <Button onClick={ this.handleSubmit } type='submit'>Submit</Button>
                    <Button onClick={ this.props.logOut } color='red' basic floated='right'type='submit'>Log Out</Button>
                </Form>
                { !this.props.user && <a href="/login">Already a member? Log in here!</a> }
            </div>
        )
    }
}