import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

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
                    style={ {
                        zIndex: 1,
                        width: '70%',
                        height: 'auto',
                        paddingLeft: "30%"
                    } }
                    src="https://cdn.dribbble.com/users/333998/screenshots/3062664/giftr.png"
                />
                <Form style={ {
                    // marginTop: '20%',
                    width: '80%',
                    marginLeft: '10%'
                }}>
                    <Form.Field>
                        <input onChange={ event => this.handleChange(event.target.value, "email") } placeholder='Email' />
                    </Form.Field>
                    <Form.Field>
                        <input onChange={ event => this.handleChange(event.target.value, "password") } placeholder='Password' type="password" />
                    </Form.Field>

                    <Button 
                        onClick={ this.handleSubmit } type='submit'
                        style={ {
                            marginLeft: 'calc(50% - 43px)'
                        } }
                    >
                        Submit
                    </Button><br></br>
                    <div style={ {
                        textAlign: 'center'
                    } }>
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