import React from 'react'
import { Card, Image, Icon, Button } from 'semantic-ui-react'

export default class Wish extends React.Component {

    render() {
        const {wish, user} = this.props
        return (<div>
            <br />
            <Card fluid>
                <Image src="" />
                <Card.Content>
                    <Card.Header><Icon name='star' />{wish.name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>£XX.XX</span>
                    </Card.Meta>
                    <Card.Description>{wish.description || "no description provided"}</Card.Description>
                    <Card.Description><a href={wish.url}>Purchase here!</a></Card.Description>
                    { user.id === wish.user_id && <Button floated="right" size="mini" color="blue">Edit</Button>}
                    { user.id === wish.user_id && <Button size="mini" floated="right" basic color="red">Delete</Button> }
                </Card.Content>
                <Card.Content extra>
                    Render stars here!
                </Card.Content>
            </Card>
        </div>)
    }
}