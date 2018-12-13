import React from 'react'
import { Input} from 'semantic-ui-react'

// import Wish from '../components/Wish'

export default class HomePage extends React.Component {

    render() {
        return (
        <div>
                <Input className='icon' icon='search' placeholder='Search...' /> 
        </div>
        )
    }
}