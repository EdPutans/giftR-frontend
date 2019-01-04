export const animateList = (component) => {
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


export const animateFade = (component) => {
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


export const animateDown = (component) => {
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