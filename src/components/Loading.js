import React from 'react'
import { Loader } from 'semantic-ui-react'

export default class Loading extends React.Component {
    render(){
        return (
            <div>

                <Loader style={{marginTop: "15em"}} active inline='centered' />
                This is where Ed may or may not put a crispy animation
            </div>
        )
    }
}