import React from 'react'
import { Button } from 'semantic-ui-react'


export default class Welcome extends React.Component {



    render() {
        return (
            
            <div 
            // className="bg-img" 
            >
                <div>
                <Button
                    onClick={ () => this.props.history.push('/login') }
                    color='red'
                    style={
                        {
                            zIndex: 100,
                            marginTop: "45%",
                            marginLeft: 'calc(50% - 80px)',
                            

                        }
                    }
                >
                    Log In
                    </Button>
                <Button onClick={ () => this.props.history.push('/signup') } basic color='teal'>Sign up</Button>
            </div>
            </div>

        )
    }
}                    