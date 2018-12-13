import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'

export default class Wish extends React.Component {

    render() {
        return (<div>
            <br />
            <Card fluid>
                <Image src="" />
                <Card.Content>
                    <Card.Header><Icon name='star' />Item title</Card.Header>
                    <Card.Meta>
                        
                    
                        <span className='date'>£XX.XX</span>
                    </Card.Meta>
                    <Card.Description>description of the item, thanos car thanos car</Card.Description>
                    <Card.Description><a href="http://www.amazon.com">Purchase here!</a></Card.Description>
                </Card.Content>
                <Card.Content extra>
                    Render stars here!
                </Card.Content>
            </Card>
        </div>)
    }
}