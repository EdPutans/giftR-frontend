import React from 'react'
import {Link} from 'react-router-dom'
import { Form, Button, Message } from 'semantic-ui-react'
import Uploader from '../components/Uploader'
import * as adapter from '../Adapter'

export default class Signup extends React.Component {

state = {
    first_name: '',
    last_name: '',
    email: '',
    age: '',
    password: '',
    repeat_password: '',
    img_url: ''
}

checkFields=()=>{
    const { first_name, last_name, email, age, password, repeat_password, img_url } = this.state
    if (
        email.includes('@')
        && age < 100
        && password.length > 5
        && first_name.length > 1
        && last_name.length > 1
        && password === repeat_password
    ){
        return true
    }else{
        return false
    }
}

checkPasswords = () =>{
    const {password, repeat_password} = this.state
    return password === repeat_password ? true : false
}

handleSignup = () => {
    const { first_name, last_name, email, age, password,repeat_password, img_url } = this.state
    if(this.checkFields())
        {if (this.checkPasswords()) {
            let user = { first_name, last_name, email, age, password, img_url }
            return adapter.postUser(user)
                .then(resp => {
                    if(!resp.error){
                        return this.props.handleLogin({ email, password })
                    }else{
                        return alert(resp.error)
                    }
                    
                })
        } else { 
            alert('Passwords have to match.') 
        }
    }
    
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
        return this.setState({ age : parseInt(value)})
    case "password":
        return this.setState({ password: value })
    case "repeat_password":
        return this.setState({ repeat_password: value })
        case "img_url":
            return this.setState({ img_url: value })               
    default:
        return null
    }
}

handleImageSet = (img_url) =>{
    this.setState({img_url})
}

// pass different props to the function to sign up or to edit the user.

    render() {
        const { first_name, last_name, email, age, password, img_url,repeat_password } = this.state
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
                <Uploader propFunction={ this.handleImageSet } />
            <Form error style={{
                // marginTop: '20%',
                width: '80%',
                marginLeft: '10%'
            }
            }>
                <Form.Field>
                    <Form.Input
                        onChange={event => this.handleChange(event.target.value, "first_name")} placeholder ='First Name' maxLength='20'
                            error={ first_name.length > 0 && first_name.length < 2}
                        />
                </Form.Field>
                <Form.Field>
                        <Form.Input
                        onChange={ event => this.handleChange(event.target.value, "last_name") } placeholder={'Last Name' }  maxLength='20'
                        error={ last_name.length >0 && last_name.length< 2 }
                        />
                </Form.Field>
                <Form.Field>
                        <Form.Input
                        error={ email.length < 3 && !email.includes('@') && email.length>0 }
                        maxLength='40'
                        onChange={ event => this.handleChange(event.target.value, "email") } placeholder={'Email' }
                        type="email" />
                </Form.Field>
                <Form.Field>
                        <Form.Input max={100}
                            type="number"
                            step={ 1 }
                            onChange={ event => this.handleChange(event.target.value, "age") } placeholder={"Age"}
                        />
                        
                </Form.Field>
                 <Form.Field>
                        <Form.Input
                        maxLength='50'
                        onChange={ event => this.handleChange(event.target.value, "password")} placeholder='Password'
                        type="password"
                       />
                        { password && password.length < 6  && <Message
                            error
                            content='6 characters minimum'
                        />}
                </Form.Field>
                <Form.Field>
                        <Form.Input maxLength='50' type="password" onChange={ event => this.handleChange(event.target.value, "repeat_password")} placeholder='Repeat password'
                        />
                        { repeat_password && password !== repeat_password && 
                        <Message
                            error
                            content='Passwords must match'
                        />
                        }
                </Form.Field>

                
                <Button 
                    onClick={this.handleSignup}
                    disabled={
                        !first_name ||
                        !last_name ||
                        !email ||
                        !age ||
                        !password ||
                        !repeat_password
                              }
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