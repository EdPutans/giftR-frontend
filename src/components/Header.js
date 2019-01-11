import React from 'react'
import * as Styles from '../Styles'

export default class Header extends React.Component {

render(){
    return(
        <h1 style={Styles.centerBlock}>
            {this.props.title}
        </h1>
    )
}

}