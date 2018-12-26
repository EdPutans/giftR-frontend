import React from 'react'
import {Link} from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'

import * as adapter from '../Adapter'

export default class Signup extends React.Component {

state = {
    first_name: '',
    last_name: '',
    email: '',
    age: '',
    password: '',
    repeat_password: ''
}

checkPasswords = () =>{
    const {password, repeat_password} = this.state
    return password === repeat_password ? true : false
}

handleSignup = () => {
    if(this.checkPasswords()){
        const {first_name, last_name, email, age, password} = this.state
        let user = { first_name, last_name, email, age, password }
        return adapter.postUser(user)
            .then(user => this.props.handleLogin({email,password}))
    }else{ alert('Passwords do not match, I believe')}
}


handleChange = (value, type) => {
    switch(type){
    case "first_name":
        return this.setState({first_name: value})
    case "last_name":
        return this.setState({ last_name : value})
    case "email":
        return this.setState({ email : value})
    case "age":
        return this.setState({ age : value})
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
        
        return (
        <div>
                <img
                    alt='giftR logo'
                    onClick={ this.props.back }
                    style={ {
                        zIndex: 1,
                        width: '70%',
                        height: 'auto',
                        paddingLeft: "30%"
                    } }
                    src="https://cdn.dribbble.com/users/333998/screenshots/3062664/giftr.png"
                />
            <Form style={{
                // marginTop: '20%',
                width: '80%',
                marginLeft: '10%'
            }
            }>
                    
                <Form.Field>
                    <input onChange={event => this.handleChange(event.target.value, "first_name")} placeholder ='First Name'/>
                </Form.Field>
                <Form.Field>
                        <input onChange={ event => this.handleChange(event.target.value, "last_name") } placeholder={'Last Name' } />
                </Form.Field>
                <Form.Field>
                        <input onChange={ event => this.handleChange(event.target.value, "email") } placeholder={'Email' } type="email" />
                </Form.Field>
                <Form.Field>
                        <input type="number" step={ 1 } onChange={ event => this.handleChange(event.target.value, "age") } placeholder={"Age"} />
                </Form.Field>
                 <Form.Field>
                        <input onChange={ event => this.handleChange(event.target.value, "password")} placeholder='Password' type="password" />
                </Form.Field>
                <Form.Field>
                        <input type="password" onChange={ event => this.handleChange(event.target.value, "repeat_password")} placeholder='Repeat password' />
                </Form.Field>

                
                <Button 
                    onClick={this.handleSignup}
                    color="teal"
                    type='submit'
                    style={ { 
                        marginLeft: 'calc(50% - 43px)'
                    }}
                >
                Submit</Button>
            </Form>
                <div style={ {
                    textAlign: 'center'
                } }>
                
                { !this.props.user && 
                <Link 
                    to="/login"
                    
                >
                    Already a member? Log in here!
                 </Link>}
                </div>
        </div>
        )
    }
}