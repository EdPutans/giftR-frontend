import React from 'react'
import { Button, Card } from 'semantic-ui-react'


export default class ProfileShow extends React.Component {


    render(){
        const {user} = this.props
        return(
                <div 
                    style={
                        {
                            margin: '3% auto auto auto',
                            width: '50%',
                            left: 0,
                            right: 0,
                          
                        } 
                    }
                >

                    <Card fluid
                    style={ { maxWidth: '300px', margin: 'auto auto 5px auto'}}
                    >
                        <img alt='user profile pic' 
                        style={ 
                            {
                        width: '80%',
                        height: 'auto',
                        margin: '0 auto',
                        display: 'block',
                        padding: '5% 0 5% 0',
                        
                    } } 
                    src={ user.img_url ? user.img_url : 'https://pngimage.net/wp-content/uploads/2018/05/default-user-png-2.png'} />
                        <Card.Content>
                            
                            <Card.Header>{`${user.first_name} ${user.last_name}`}</Card.Header>
                            <Card.Meta>
                               {user.email}
                            </Card.Meta>
                            <Card.Description>{user.age} y.o. </Card.Description>
                        </Card.Content>
                        
                    </Card>
                    {/* <Segment.Group>
                        <Segment>  First name: { user.first_name } </Segment>
                        <Segment>  Last name: { user.last_name } </Segment>
                        <Segment>  Email: { user.email } </Segment>
                        <Segment>  Age: { user.age } </Segment>
                    </Segment.Group> */}
                <div style={ { maxWidth: '300px', margin: 'auto auto 5px auto'}}>
                        {this.props.logout && <Button onClick={ this.props.logout } color='red' type='submit'>Log Out</Button>}
                        {this.props.toggleEdit && <Button floated='right' onClick={ this.props.toggleEdit }> edit </Button>}
                    </div>
                   
                </div>
    )
}
}