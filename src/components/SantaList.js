import React from 'react'
import * as Adapter from '../Adapter'

export default class SantaList extends React.Component {

    // mapPeople = async () =>

    //     })

   


    render(){

        return(
        <div>
            {this.props.ids.length >0 && this.mapPeople()}
        </div>
        )
    }

}