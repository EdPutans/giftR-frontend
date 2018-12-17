import React from 'react'
import { Form, Button, Label } from 'semantic-ui-react'
import * as adapter from '../Adapter'

export default class Profile extends React.Component {

    state = {
        
    }

    checkPasswordFields = () => {
        const { password, repeat_password } = this.state
        return password === repeat_password ? true : false
    }


    handleSubmit = () => {

        const { first_name,last_name, email, age, old_password, new_password, repeat_password } = this.state
        // only if old password present
        let user = this.props.user
        let updatedUser = {}

        updatedUser.id = this.props.user.id 
        updatedUser.age = age? age : user.age
        updatedUser.first_name = first_name ? first_name : user.first_name
        updatedUser.last_name = last_name ? last_name : user.last_name
        updatedUser.email = email? email : user.email
        updatedUser.old_password = old_password
        updatedUser.password = new_password
        console.log('bfore:,',updatedUser)
        adapter.updateUserById(updatedUser).then(r=>console.log(r))



        // adapter.signin(this.props.currentUser.email, old_password)
        //     .then(resp1=>{
        //         console.log('first respnse:', resp1)
        //         if(resp1.error){
        //             alert("Response error")
        //         }else{
        //             user.password = old_password
        //             user.email = this.props.currentUser.email
        //             console.log('patching user with this:', user)
        //             adapter.patchUser(user).then(resp2 =>{
        //                 console.log('second resp:', resp2)
        //                 if(resp2.error){
        //                     alert('error patching user')
        //                 }else{
        //                    console.log('successfully updated')
                           
                            
        //                 }
        //             })
        //         }
        //     })

        // if(this.checkPasswordFields()){
        // }else{
        //     alert('Check your details')
        // }
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
                <Form><br/>
                   
                    <Form.Field>
                        <input onChange={ event => this.handleChange(event.target.value, "first_name") } placeholder={user.first_name} />
                    </Form.Field>
                    <Form.Field>
                        <input onChange={ event => this.handleChange(event.target.value, "last_name") } placeholder={ user.last_name } />
                    </Form.Field>
                    <Form.Field>
                        <input onChange={ event => this.handleChange(event.target.value, "email") } placeholder={ user.email } type="text" />
                    </Form.Field>
                    <Form.Field>
                        <input type="number" step={ 1 } onChange={ event => this.handleChange(event.target.value, "age") } placeholder={ user.age } />
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
                    <Button onClick={ this.handleSubmit } type='submit'>Submit</Button>
                    <Button onClick={ this.props.logOut } color='red' basic floated='right'type='submit'>Log Out</Button>
                </Form>
                { !this.props.user && <a href="/login">Already a member? Log in here!</a> }
            </div>
        )
    }
}