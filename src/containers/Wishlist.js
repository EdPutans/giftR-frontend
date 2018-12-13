import React from 'react'
import Wish from '../components/Wish'


export default class Wishlist extends React.Component {

    render() {
        return (
        <div>
            {this.props.wishes.map(w => <Wish wish={w}/>)  }
        </div>)
    }
}