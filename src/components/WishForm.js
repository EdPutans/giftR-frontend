import React from 'react'
import * as adapter from '../Adapter'
import { Form, Button, Radio, Label } from 'semantic-ui-react'
import BodyBackgroundColor from 'react-body-backgroundcolor'
export default class WishForm extends React.Component {

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

    saveEdit = () => {
        const updatedWish = { ...this.props.wish }
        let { rating, name, description, url, img_url, price } = this.state
        updatedWish.rating = !rating ? updatedWish.rating : rating
        updatedWish.price = !price ? updatedWish.price : price
        updatedWish.description = !description ? updatedWish.description : description
        updatedWish.url = !url ? updatedWish.url : url
        updatedWish.img_url = !img_url ? updatedWish.img_url : img_url
        updatedWish.name = !name ? updatedWish.name : name
        adapter.patchGift(updatedWish)
            .then(r => {
                this.props.toggleEdit()
                this.props.updateAfterEdit(r)
            })
    }



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
        return (
            <BodyBackgroundColor backgroundColor='#F6CFCA'>
        <div style={ !this.props.editing ?
            {
                zIndex: 1,
                paddingTop: "8em",
                marginLeft: '10%',
                marginRight: '10%'
            }
            :
            {
                paddingTop: "1em"
            } }
        >
            <Form>
                <Form.Field>
                    <input
                        value = {this.props.editing && this.props.wish.name? this.props.wish.name : ""}
                        type="text"
                        maxlength="20"
                        name="name"
                        placeholder="Title"
                        onChange={ event => this.setState({ name: event.target.value }) }
                    />
                </Form.Field>
                <Form.Field>
                    <textarea
                        value={ this.props.editing && this.props.wish.description ? this.props.wish.description : "" }
                        maxlength="500"
                        type="text"
                        name="description"
                        placeholder="Description (up to 500 characters)"
                        onChange={ event => this.setState({ description: event.target.value }) }
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        value={ this.props.editing && this.props.wish.url ? this.props.wish.url : "" }
                        maxlength="500"
                        type="text"
                        name="url"
                        placeholder="Link to purchase"
                        onChange={ event => this.setState({ url: event.target.value }) }
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        value={ this.props.editing && this.props.wish.img_url ? this.props.wish.img_url : "" }
                        maxlength="500"
                        type="text"
                        name="img_url"
                        placeholder="Image link"
                        onChange={ event => this.setState({ img_url: event.target.value }) }
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        value={ this.props.editing && this.props.wish.price ? this.props.wish.price : "" }
                        maxLength="2"
                        maxlength="20"
                        type="number"
                        name="price"
                        placeholder="Price"
                        onChange={ event => this.setState({ price: parseInt(event.target.value) }) }
                    />
                </Form.Field>
                <Label > Priority: <div>
                    {/* <Form.Group> */ }
                    { this.selection.map(s =>
                        <Form.Field
                            key={ s.value }
                            control={ Radio }
                            label={ s.label }
                            value={ s.value }
                            checked={ this.state.rating === s.value }
                            onChange={ () => this.setStars(s.value) }

                        />
                    ) }
                    {/* </Form.Group> */ }
                </div>
                </Label>

            </Form><br />
            { this.props.editing ?
                <Button color="teal" onClick={ this.saveEdit }>Save changes!</Button>
                :
                <Button color="teal" onClick={ this.handleSubmit }>Make a wish!</Button>
            }

                </div></BodyBackgroundColor>)
    }
}