import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'

export default class Wish extends React.Component {

    render() {
        const {wish} = this.props
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
                </Card.Content>
                <Card.Content extra>
                    Render stars here!
                </Card.Content>
            </Card>
        </div>)
    }
}