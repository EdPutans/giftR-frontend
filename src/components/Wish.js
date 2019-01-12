import React from 'react'
import { Card, Icon, Button } from 'semantic-ui-react'
import WishForm from './WishForm'
import * as Styles from '../Styles'

export default class Wish extends React.Component {


    handleEdit =()=>{
        this.props.history.push({
            pathnme: '/edit_wish',
            state: { wish: this.props.wish }
        })
    }

    state={
        editing: false,
        wish: null
    }

    componentDidMount=()=>{
        this.props.wish && this.setState({ wish: this.props.wish })
    }

    updateAfterEdit=(wish)=>{
        this.setState({ wish })
    }

    renderStars = digit => {
        switch(digit){
            case 5:
                return "★★★★★"
            case 4:
                return "★★★★"
            case 3:
                return "★★★"
            case 2:
                return "★★"
            case 1:
                return "★"
            default:
                return "No rating specified."
        }
    }

    toggleEdit=()=>{
        this.setState({ editing: !this.state.editing})
    }


    render() {
        const {currentUser} = this.props
        const {wish} = this.state
        if(this.state.wish){return (<div>
            <br />
            <Card 
                style={ Styles.editableCard}
            >
                <div style={Styles.mapImageContainer}>
                    <img 
                        alt='wish'
                        style={ Styles.mapImage } 
                        src={ 
                            wish.img_url ||
                            'https://images.immediate.co.uk/volatile/sites/3/2017/11/imagenotavailable1-39de324.png'
                        } 
                    />
                </div>
                <Card.Content>
                    <Card.Header><Icon name='star'/>{wish.name}</Card.Header>
                    
                    <Card.Meta>
                        <span className='price'>£ { wish.price || "Price unspecified"} </span>
                    </Card.Meta>
                    <Card.Description>{wish.description || "No description provided"} </Card.Description>

                    {wish.url && wish.url !== "http://"? 
                        <Card.Description><a href={ wish.url }>Purchase here!</a></Card.Description> : <Card.Description>No purchase link provided</Card.Description>
                    }
                </Card.Content>
                    
                <Card.Content extra>
                    
                    Rating: {this.renderStars(wish.rating)}
                    { currentUser.id === wish.user_id && <Button
                        floated="right"
                        size="mini"
                        color="teal"
                        basic
                        onClick={ this.toggleEdit }
                    >
                        { this.state.editing ? "Cancel" : "Edit" }
                    </Button>
                    }
                    { this.state.editing && <WishForm
                        deleteWishFromDB={ this.props.deleteWishFromDB }
                        deleteWish={ this.props.deleteWish }
                        editing={ true }
                        wish={wish}
                        updateAfterEdit={this.updateAfterEdit}
                        toggleEdit={this.toggleEdit}
                    /> }
                </Card.Content>
            </Card>
        </div>)
        } else { 
            // do not remove
            return <div></div>
        }
        
    }
}