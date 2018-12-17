import React from 'react'
import { Input} from 'semantic-ui-react'

// import Wish from '../components/Wish'

export default class HomePage extends React.Component {

    render() {
        return (
            <div style={ {
                zIndex: 1,
                paddingTop: "3em"
            } }>
                <Input style={ { marginTop: '10em' } } className='icon' fluid icon='search' placeholder='Search...' /> 
        </div>
        )
    }
}