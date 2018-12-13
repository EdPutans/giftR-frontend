import React from 'react'
import {Form, Button, Radio, Icon} from 'semantic-ui-react'

export default class WishForm extends React.Component {

    state={
        stars: 3
    }
    
    selection = [
        { value: 1, label: "★"},
        { value: 2, label: "★★"},
        { value: 3, label: "★★★"},
        { value: 4, label: "★★★★"},
        { value: 5, label: "★★★★★" }
    ]

    setStars = (num) => this.setState({stars: parseInt(num)})

    render() {
        return (<div>
            <Form>
                <Form.Field>
                    <input type="text" name="name" placeholder="Title"></input>
                </Form.Field>
                <Form.Field>
                    <input type="text" name="description" placeholder="Description"></input>
                </Form.Field>
                <Form.Field>
                    <input type="text" name="url" placeholder="Purchase link"></input>
                </Form.Field>
                <Form.Field>
                    <input type="text" name="img_url" placeholder="Picture URL"></input>
                </Form.Field>
                <Form.Field>
                    <input type="number" name="price" placeholder="Price"></input>
                </Form.Field>
                 <label> Priority: </label>
                <Form.Group>
                    {this.selection.map(s => 
                    <Form.Field
                        key={s.value}
                        control={ Radio }
                        label={s.label}
                        value={s.value}
                        checked={ this.state.stars === s.value }
                        onChange={e=> this.setStars(s.value) }
                    />
                    ) }
                </Form.Group>
                
            </Form><br />
            <Button>Make a wish!</Button>
        </div>)
    }
}