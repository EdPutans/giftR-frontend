import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import * as Styles from '../Styles'


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
                <img
                    onClick={this.props.back}
                    alt = 'giftR logo'
                    style={ Styles.giftrLogo }
                    src="https://cdn.dribbble.com/users/333998/screenshots/3062664/giftr.png"
                />
                <Form style={ Styles.form }>
                        <Form.Field>
                            <input onChange={ event => this.handleChange(event.target.value, "email") } placeholder='Email' />
                        </Form.Field>
                        <Form.Field>
                            <input onChange={ event => this.handleChange(event.target.value, "password") } placeholder='Password' type="password" />
                        </Form.Field>
                        <Button 
                            onClick={ this.handleSubmit } type='submit'
                            style={ Styles.submitButton }
                        >
                            Submit
                        </Button><br></br>
                        <div style={ Styles.centerBlock}>
                        <Link 
                            to="/signup"
                        >
                            Not a member yet? Sign up here!
                        </Link>
                    </div>
                </Form>
            </div>
            )
    }
}