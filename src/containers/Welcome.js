import React from 'react'
import { Button } from 'semantic-ui-react'



export default class Welcome extends React.Component {



    render() {
        return (
            <div style={{
                
                backgroundColor: '#FFFFFF',
            }}
           
            >
                <img 
                    style={ {
                        display: 'block',
                        overflow: 'hidden',
                        maxWidth: '400px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        height: 'auto',
                    } }

                                src="https://cdn.dribbble.com/users/333998/screenshots/3062664/giftr.png"
                 />
                 <div>
                <Button
                    style={{
                        marginLeft:'calc(50% - 80px)'
                    }}
                    onClick={ () => this.props.history.push('/login') }
                    color='red'
                >
                    Log In
                </Button >
                <Button 
                    onClick={ () => this.props.history.push('/signup') } 
                    basic    
                    color='teal'
                >
                    Sign up
                </Button>
                </div>
            
            </div>

        )
    }
}                    