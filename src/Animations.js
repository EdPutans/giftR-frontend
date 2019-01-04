import { Animate } from 'react-simple-animate'
import React from 'react'
// import * as animate from '../Animations'


export const list = (component) => {
    return <Animate
        play={ true }
        startStyle={ { "transform": "translateX(100px)" } }
        endStyle={ { "transform": "translateX(0)" } }
        durationSeconds="0.3"
        delaySeconds='0'
    >
        { component }
    </Animate>
}


export const fade = (component) => {
    return <Animate
        play={ true }
        startStyle={ { "opacity": 0 } }
        endStyle={ { "opacity": 1 } }
        durationSeconds="0.2"
        delaySeconds='0.1'
    >
        { component }
    </Animate>
}


export const down = (component) => {
    return <Animate
        play={ true }
        startStyle={ { "transform": "translateY(-10px)", "opacity": 0 } }
        endStyle={ { "transform": "translateY(0)", "opacity": 1 } }
        durationSeconds="0.3"
        delaySeconds='0'
    >
        { component }
    </Animate>
}

export const santaList =  (component) => {
        return <Animate
            play={ true }
            startStyle={ {
                "transform": "translateX(30px)", "opacity": 0
            } }
            endStyle={ {
                "transform": "translateX(0)", "opacity": 1
            } }
            reverseDurationSeconds='0.2'

            durationSeconds="0.1"
            delaySeconds='0'
        >
            { component }
        </Animate>
    }
