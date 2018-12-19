import React from 'react'
import { Button } from 'semantic-ui-react'



export default class Welcome extends React.Component {



    render() {
        return (
            <div style={{
                backgroundColor: '#FFFFFF',
                // paddingBottom: '1000%'
            }}
           
            >
                <img 
                    style={{
                        zIndex: 1,
                        width: '100%',
                        height: 'auto'
                        }}
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