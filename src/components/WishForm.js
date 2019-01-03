import React from 'react'
import * as adapter from '../Adapter'
import { Form, Button, Radio, Label } from 'semantic-ui-react'
import Header from './Header'
import { Animate } from 'react-simple-animate'

export default class WishForm extends React.Component {


    state = {
        rating: 0,
        name: this.props.editing && this.props.wish.name ? this.props.wish.name : "" ,
        description: this.props.editing && this.props.wish.description ? this.props.wish.description : "",
        url: this.props.editing && this.props.wish.url ? this.props.wish.url : "",
        img_url: this.props.editing && this.props.wish.img_url ? this.props.wish.img_url : "",
        price: this.props.editing && this.props.wish.price ? this.props.wish.price : ""
    }

    selection = [
        { value: 1, label: "★" },
        { value: 2, label: "★★" },
        { value: 3, label: "★★★" },
        { value: 4, label: "★★★★" },
        { value: 5, label: "★★★★★" }
    ]

    handleBack=()=>{
        this.props.history.push('/wishlist')
    }

    deleteWish=()=>{
        this.props.deleteWishFromDB(this.props.wish.id).then( () =>
        this.props.deleteWish(this.props.wish.id) )
    }

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



    animateDown = (component) => {
        return <Animate
            play={ true }
            startStyle={ { "transform": "translateY(-10px)", "opacity": 0 } }
            endStyle={ { "transform": "translateY(0)", "opacity": 1 } }
            durationSeconds="0.3"
            delaySeconds='0'
        >
            { component }
        </Animate>
    }


    render() {
        return (
           
        <div style={ !this.props.editing ?
            {
                zIndex: 1,
                paddingTop: "3em",
                marginLeft: '10%',
                marginRight: '10%'
            }
            :
            {
                paddingTop: "1em"
            } }
        >
                { !this.props.editing && <Header title={ 'Make a wish!' } />}
            {this.animateDown(<Form>
                <Form.Field>
                    <input
                        defaultValue = {this.state.name}
                        type="text"
                        maxLength="20"
                        name="name"
                        placeholder="Title"
                        onChange={ event => this.setState({ name: event.target.value }) }
                    />
                </Form.Field>
                <Form.Field>
                    <textarea
                        defaultValue={ this.state.description }
                        maxLength="500"
                        type="text"
                        name="description"
                        placeholder="Description (up to 500 characters)"
                        onChange={ event => this.setState({ description: event.target.value }) }
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        defaultValue={ this.state.url }
                        maxLength="500"
                        type="text"
                        name="url"
                        placeholder="Link to purchase"
                        onChange={ event => this.setState({ url: event.target.value }) }
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        defaultValue={ this.state.img_url }
                        maxLength="500"
                        type="text"
                        name="img_url"
                        placeholder="Image link (optional)"
                        onChange={ event => this.setState({ img_url: event.target.value }) }
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        defaultValue={ this.state.price }
                        
                        maxLength="20"
                        type="number"
                        name="price"
                        placeholder="Price"
                        onChange={ event => this.setState({ price: parseInt(event.target.value) }) }
                    />
                </Form.Field>
                <Label > Priority (optional): <div>
                    {/* <Form.Group> */ }
                    { this.selection.map(s =>
                        <Form.Field
                            key={ s.value }
                            control={ Radio }
                            label={ s.label }
                            defaultValue={ s.value }
                            checked={ this.state.rating === s.value }
                            onChange={ () => this.setStars(s.value) }

                        />
                    ) }
                    {/* </Form.Group> */ }
                </div>
                </Label>

            </Form>)}
            <br />
            { this.props.editing ? <div>
                <Button color="teal" onClick={ this.saveEdit }>Save changes!</Button>
                <Button color="red" floated='right' onClick={ this.deleteWish }>Delete</Button>
                </div>
                :
                <div>
                    <Button 
                        color="teal" 
                        onClick={ this.handleSubmit }
                        disabled={
                            !this.state.name ||
                            !this.state.description ||
                            !this.state.url ||
                            !this.state.price 
                        }
                    >
                        Make a wish!
                    </Button>
                    <Button
                        onClick={this.handleBack}
                        color='red'
                        basic
                    >
                        Cancel
                    </Button>
                </div>
            }

                </div>
                )
    }
}