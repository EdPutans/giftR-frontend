import React from 'react'

export default class Header extends React.Component {

render(){
    return(
        <h1 style={
            {
                textAlign: 'center'
            }
        }>{this.props.title}</h1>
    )
}

}