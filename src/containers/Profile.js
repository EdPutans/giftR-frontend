import React from 'react'
import { Form, Button, Label } from 'semantic-ui-react'
import * as adapter from '../Adapter'

export default class Profile extends React.Component {

    state = {
        // starts off empty and only tracks field data
    }

    checkPasswordFields = () => {
        const { password, repeat_password } = this.state
        return password === repeat_password ? true : false
    }



    handleSubmit = () => {
        if(this.checkPasswordFields()){
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
                   
                    r.error ? alert('Incorrect current password.')
                        :
                        this.props.history.push('/')
                })
        }else{
            alert("Password fields don't match.")
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

    // pass different props to the function to sign up or to edit the user.

    render() {
        const {user} = this.props
        return (
            <div style={ {
                zIndex: 1,
                paddingTop: "4em"
            } }>
                <Form
                    style={ {
                        marginTop: '20%',
                        width: '80%',
                        marginLeft: '10%'
                    } }
                ><br/>
                   
                    <Form.Field>
                        <input
                            onChange={ event => this.handleChange(event.target.value, "first_name") }
                            placeholder={'First name: ' + user.first_name}
                            maxlength="20"  />
                    </Form.Field>
                    <Form.Field>
                        <input onChange={ event => this.handleChange(event.target.value, "last_name") } placeholder={ "Last Name: " + user.last_name } maxlength="20" />
                    </Form.Field>
                    <Form.Field>
                        <input onChange={ event => this.handleChange(event.target.value, "email") } placeholder={ "Email: " + user.email } type="text" maxlength="20" />
                    </Form.Field>
                    <Form.Field>
                        <input type="number" step={ 1 } onChange={ event => this.handleChange(event.target.value, "age") } placeholder={ "Age: " + user.age } maxlength="20"  />
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
                    <Label color='red'>Current password required to perform changes.</Label>
                    
                </Form>
                <Button onClick={ this.handleSubmit } type='submit'>Submit</Button>
                <Button onClick={ this.props.logOut } color='red' basic floated='right' type='submit'>Log Out</Button>
                { !this.props.user && <a href="/login">Already a member? Log in here!</a> }
            </div>
        )
    }
}