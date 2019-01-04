import React from 'react'
import { Button } from 'semantic-ui-react'
import * as animate from '../Animations'


export default class Welcome extends React.Component {

    // buttonStyle = {
    //     zIndex: 100,
    //     position: 'relative',
    //     margin: '100px 100px',
    //     paddingLeft: '24px ',
    //     paddingRight: '24px',
    //     // maxWidth: '1280px '
    // }

   

    render() {
        return (
            animate.fade(
            <div style={{ backgroundColor: '#FFFFFF' }}
           
            >
                <img alt='giftR logo'
                    style={ {
                        display: 'block',
                        overflow: 'hidden',
                        maxWidth: '80%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        height: 'auto',
                    } }

                                src="https://cdn.dribbble.com/users/333998/screenshots/3062664/giftr.png"
                 />
                 <div>
                <Button
                    // style={ this.buttonStyle}
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
                    // style={this.buttonStyle}
                    color='teal'
                >
                    Sign up
                </Button>
                </div >
                <div style={ { textAlign: 'center', margin: '10% 5% 0 5%' } }>
                    <h4>GiftR takes care of your holiday gifting headache</h4>
                    <h6>Find out what other people would like to get as a gift!</h6>
                </div>
            </div>)

        )
    }
}                    