import React from 'react'
import { Form, Button, Radio, Icon, Label } from 'semantic-ui-react'

export default class WishForm extends React.Component {

    state = {
        rating: 0
    }

    selection = [
        { value: 1, label: "★" },
        { value: 2, label: "★★" },
        { value: 3, label: "★★★" },
        { value: 4, label: "★★★★" },
        { value: 5, label: "★★★★★" }
    ]

    setStars = (num) => this.setState({ rating: parseInt(num) })

    render() {
        return (<div>
            <Form>
                <Form.Field>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Title" 
                        onChange={event=>this.setState({name: event.target.value})}
                        />
                </Form.Field>
                <Form.Field>
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        onChange={ event => this.setState({ description: event.target.value }) }
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        type="text"
                        name="url"
                        placeholder="Link to purchase"
                        onChange={ event => this.setState({ url: event.target.value }) }
                    />                
                </Form.Field>
                <Form.Field>
                    <input
                        type="text"
                        name="img_url"
                        placeholder="Image link"
                        onChange={ event => this.setState({ img_url: event.target.value }) }
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        maxLength="2"
                        type="number"
                        name="price"
                        placeholder="Price"
                        onChange={ event => this.setState({ price: parseInt(event.target.value) }) }
                    />
                </Form.Field>
                <Label > Priority: <div>
                    <Form.Group inline>
                        { this.selection.map(s =>
                            <Form.Field
                                key={ s.value }
                                control={ Radio }
                                label={ s.label }
                                value={ s.value }
                                checked={ this.state.stars === s.value }
                                onChange={ () => this.setStars(s.value) }
                            />
                        ) }
                    </Form.Group>
                </div>
                </Label>

            </Form><br />
            <Button>Make a wish!</Button>
        </div>)
    }
}