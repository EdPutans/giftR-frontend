import React from 'react'
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import WishForm from './WishForm'

export default class Wish extends React.Component {

    handleEdit =()=>{
        this.props.history.push({
            pathnme: '/edit_wish',
            state: { wish: this.props.wish }
        })
    }

    state={
        editing: false
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
        const {wish, user} = this.props
        return (<div>
            <br />
            <Card fluid>
                <Image style={{maxHeight: '60%', maxWidth: '60%', margin:'0 auto', display: 'block'}} src={wish.img_url? wish.img_url :""} />
                <Card.Content>
                    <Card.Header><Icon name='star'/>{wish.name}</Card.Header>
                    { user.id === wish.user_id && <Button 
                        floated="right" 
                        size="mini" 
                        color="teal"
                        onClick={this.toggleEdit}
                    >
                    {this.state.editing? "Cancel" : "Edit"}
                    </Button> 
                        }
                    <Card.Meta>
                        <span className='price'>£ { wish.price || "Price unspecified"} </span>
                    </Card.Meta>
                    <Card.Description>{wish.description || "No description provided"} </Card.Description>

                    {wish.url? 
                        <Card.Description><a href={ wish.url }>Purchase here!</a></Card.Description> : <Card.Description>No purchase link provided</Card.Description>
                    }
                </Card.Content>
                    
                <Card.Content extra>
                    Rating: {this.renderStars(wish.rating)}
                </Card.Content>
                {this.state.editing && <WishForm />}
            </Card>
        </div>)
    }
}