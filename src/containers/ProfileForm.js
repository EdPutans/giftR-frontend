import React from 'react'
import { Form, Button, Label} from 'semantic-ui-react'
import * as adapter from '../Adapter'
import Uploader from '../components/Uploader'
import * as animate from '../Animations'
import * as Styles from '../Styles'


export default class ProfileForm extends React.Component {

    state = {
        first_name: '',
        last_name: '',
        age: '',
        email: '',
        old_password: '',
        new_password: '',
        repeat_password: ''
    }


    checkFields = () => {
        const { first_name, last_name, email, age, new_password, repeat_password, old_password } = this.state
        if (
            (!email || email.includes('@'))
            && (!age || age < 100)
            && old_password 
            && (!new_password || new_password.length > 5)
            && (!first_name || first_name.length > 1)
            && (!last_name || last_name.length > 1)
            && (!new_password || new_password === repeat_password)
        ) {
            return true
        } else {
            return false
        }
    }
    checkPasswordFields = () => {
        const { new_password, repeat_password } = this.state
        return new_password === repeat_password ? true : false
    }

    checkForPasswordPresense = () => {
        return this.state.old_password ? true : false
    }

    handleSubmit = () => {
        if (
            this.checkPasswordFields() 
            &&
            this.checkFields()
            && 
            this.checkForPasswordPresense()) {
            const { first_name, last_name, email, age, old_password, new_password, img_url } = this.state
            let user = this.props.user
            let updatedUser = {}

            updatedUser.id = this.props.user.id
            updatedUser.age = age ? age : user.age
            updatedUser.first_name = first_name ? first_name : user.first_name
            updatedUser.last_name = last_name ? last_name : user.last_name
            updatedUser.email = email ? email : user.email
            updatedUser.img_url = img_url ? img_url : user.img_url
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
            alert("Please check the information in the fields")
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


    setImage=(img_url)=>
        this.setState({img_url})
    
    


    render() {
        const { user } = this.props
        const { first_name, last_name, email, age, new_password, repeat_password, old_password } = this.state
        return (
        animate.down(<div
            style={Styles.topSpace}
        >
                <div>
                    <Uploader 
                        profilePicURL={user.img_url}
                        propFunction={this.setImage}
                    />
                </div>
                    <Form
                        style={ Styles.form }
                    ><br />

                        <Form.Field>
                            { !this.checkForPasswordPresense() && <Label>Note: To save changes enter current password below.</Label> }
                            <Form.Input style={ Styles.topSpace }
                                onChange={ event => this.handleChange(event.target.value, "first_name") }
                                placeholder={ 'First name: ' + user.first_name }
                                maxLength="20"
                                error={ first_name && first_name.length < 2 } 
                            />
                            
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                onChange={ event => this.handleChange(event.target.value, "last_name") } placeholder={ "Last Name: " + user.last_name } maxLength="30" 
                                error={ last_name && last_name.length < 2 } 
                            />
                        
                        </Form.Field>
                        <Form.Field>
                            <Form.Input onChange={ event => this.handleChange(event.target.value, "email") } placeholder={ "Email: " + user.email } type="text" maxLength="30" 
                        error={ email && email.length < 3 && !email.includes('@') }/>
                         
                        </Form.Field>
                        <Form.Field>
                            <Form.Input type="number" step={ 1 } onChange={ event => this.handleChange(event.target.value, "age") } placeholder={ "Age: " + user.age } maxLength="2" 
                        error={ age && parseInt(age) > 100}
                            />
                            
                        </Form.Field>
                        <Form.Field>
                            <Form.Input type="password" 
                                maxLength='50'
                                onChange={ event => this.handleChange(event.target.value, "old_password") } placeholder='Current password'
                                error={!old_password}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input onChange={ event => this.handleChange(event.target.value, "new_password") } placeholder='New password'
                            maxLength='50'
                            type="password"
                            error={ new_password && new_password.length < 6 && '6 chars'}   
                            />
                        
                        </Form.Field>
                        <Form.Field>
                            <Form.Input type="password" onChange={ event => this.handleChange(event.target.value, "repeat_password") } 
                            maxLength='50'
                            placeholder='Repeat password' 
                            error={ repeat_password && repeat_password !== new_password }
                            />
                        
                        </Form.Field>
                        <Button onClick={ this.handleSubmit } color='teal' floated='right' 
                        disabled={!old_password}
                        type='submit'>Save</Button>
                        <Button onClick={ this.props.toggleEdit } color='red' basic type='submit'>Cancel</Button>
                    </Form>
                    { !this.props.user && <a href="/login">Already a member? Log in here!</a> }
                </div>)

        )
    }
}