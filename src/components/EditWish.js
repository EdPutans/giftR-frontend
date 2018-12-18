import React from 'react'
import { Form, Button, Radio, Label } from 'semantic-ui-react'

export default class EditWish extends React.Component {

    state = {
        rating: 0,
        name: '',
        description: '',
        url: '',
        img_url: '',
        price: 0
    }

    selection = [
        { value: 1, label: "★" },
        { value: 2, label: "★★" },
        { value: 3, label: "★★★" },
        { value: 4, label: "★★★★" },
        { value: 5, label: "★★★★★" }
    ]

    setStars = (num) => this.setState({ rating: parseInt(num) })

    handleSubmit = () => {
        let { name, description, url, img_url, price, rating } = this.state
        url = !url.includes("http://") || !url.includes("https://") ? "http://" + url : url
        const newWish = {
            name, description, url, img_url, price, rating
        }

        this.props.handleSubmit(newWish)
    }

    render() {
        return (<div>
            <Form>
                <Form.Field>
                    <input
                        type="text"
                        name="name"
                        placeholder="Title"
                        onChange={ event => this.setState({ name: event.target.value }) }
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
                    <Form.Group>
                        { this.selection.map(s =>
                            <div>
                                <Form.Field
                                    key={ s.value }
                                    control={ Radio }
                                    label={ s.label }
                                    value={ s.value }
                                    checked={ this.state.rating === s.value }
                                    onChange={ () => this.setStars(s.value) }
                                />
                            </div>
                        ) }
                    </Form.Group>
                </div>
                </Label>

            </Form><br />
            <Button color="teal" onClick={ this.handleSubmit }>Save!</Button>
        </div>)
    }
}