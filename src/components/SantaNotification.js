import React from 'react'
import { Button, Card} from 'semantic-ui-react'
import * as Adapter from '../Adapter'


export default class SantaNotification extends React.Component {

    state = {
        read: false
    }

    setRead = async () => {
        const resp = await Adapter.makeSantaRead(this.props.santa.id)
        if(!resp.error){
           this.setState({ read: true })
           this.props.handleClick()

        }else{
           return alert("The 'Cool' Button broke for some reason ")
        }
        
    }


    render(){
        const {santa} = this.props
        return(
        !this.state.read?
        <Card fluid>
            <Card.Content>
            <Card.Header>{santa.receiver.first_name} {santa.receiver.last_name}</Card.Header>
            <Card.Meta>This person is your target for a secret santa event. You can see more info <a href='/santa/'>here</a>.</Card.Meta>
            <Button
                size='tiny'
                color='teal'
                onClick={this.setRead}
            >
            Cool!
            </Button>
            </Card.Content>
        </Card>
        :
        <div>Cool!</div>
    )}
}