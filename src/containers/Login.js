import React from 'react'
import { Form, Button } from 'semantic-ui-react'

export default class Login extends React.Component {

    state = {
        email: '',
        password: ''
    }

    handleSubmit = () => {
        const {email, password} = this.state
        this.props.handleLogin({email,password})
    }    


    handleChange = (value, type) => {
        switch (type) {
            case "email":
                return this.setState({ email: value })
            case "password":
                return this.setState({ password: value })
            default:
                return null
        }
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Field>
                        <input onChange={ event => this.handleChange(event.target.value, "email") } placeholder='First Name' />
                    </Form.Field>
                    <Form.Field>
                        <input onChange={ event => this.handleChange(event.target.value, "password") } placeholder='Password' type="password" />
                    </Form.Field>

                    <Button onClick={ this.handleSubmit } type='submit'>Submit</Button>
                </Form>
                
                <a href="/signup">Not a member yet? Sign up here!</a>
            </div>
            )
    }
}