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
                        <span className='price'>£ { wish.price || "Price unspecified"} </span>
                    </Card.Meta>
                    <Card.Description>{wish.description || "No description provided"} </Card.Description>

                    {wish.url? 
                        <Card.Description><a href={ wish.url }>Purchase here!</a></Card.Description> : <Card.Description>No purchase link provided</Card.Description>
                    }

                    
                    { user.id === wish.user_id && <Button floated="right" size="mini" color="teal">Edit</Button>}
                </Card.Content>
                    
                <Card.Content extra>
                    Rating: {wish.rating || "None"}
                </Card.Content>
            </Card>
        </div>)
    }
}