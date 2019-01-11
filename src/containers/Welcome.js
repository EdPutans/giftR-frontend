import React from 'react'
import { Button } from 'semantic-ui-react'
import * as animate from '../Animations'
import * as Styles from '../Styles'


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
            <div >
                <img alt='giftR logo'
                    style={ Styles.welcomeGiftrLogo }
                    src="https://cdn.dribbble.com/users/333998/screenshots/3062664/giftr.png"
                 />
                 <div>
                <Button
                    // style={ this.buttonStyle}
                    style={
                        Styles.welcomeLoginButton
                    }
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
                <div style={ Styles.welcomePitch}>
                    <h4>GiftR takes care of your holiday gifting headache</h4>
                    <h6>Find out what other people would like to get as a gift!</h6>
                </div>
            </div>)

        )
    }
}                    