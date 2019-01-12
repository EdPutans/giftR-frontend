// import * as Styles from './Styles'


// styling for the main Div for the entire app

export const mainDiv = {
    borderRadius: '5px',
    backgroundColor: '#FFFFFF',
    paddingBottom: '6%',
    margin: '60px auto ',
    minWidth: '375px',
    width: '80%',
    position: 'absolute',
    left: 0,
    right: 0,
}

export const searchCard = {
    zIndex: 1,
    minWidth: '375px',
    paddingTop: "1em"
}

// highly reusable styling components
export const betweenTwo1ems =  { margin: '1em 0 1em 0' }
export const betweenTwo3ems = { 
    zIndex: '1',
    margin: '3em 0 3em 0' 
}

export const form = {
    width: '80%',
    marginLeft: '10%'
}

export const card = {
    textAlign: 'center',
    margin: '1em auto',
}
export const noRightMargin ={ marginRight: '0px'}
export const left1em = { margin: 'auto auto auto 1em' }
export const topSpace = {marginTop: '3em'}
export const bottomSpace = { margin: '0 0 3em 0' }

export const centerBlock ={
    display: 'block',
    textAlign: 'center',
    margin: 'auto'
}

export const returnButton = {
    position: 'fixed',
    marginLeft: 'calc(50% - 56px)',
    margin: 'auto',
    bottom: '1em',
    textAlign: 'center'
} 


export const plusButton = {
    right: '10px',
    position: 'fixed',
    top: '90%',
} 

export const wishListMessageToUser = { marginTop: '5px', textAlign: 'center' }

export const greenTick = { maxHeight: '20px', width: 'auto' } 


export const giftrLogo ={
    zIndex: 1,
    width: '70%',
    height: 'auto',
    paddingLeft: "30%"
}

export const mapImageContainer = { overflow: 'hidden', margin: '5% 5% 5% 5%' }

export const mapImage = {
    
    height: '200px',
    width: 'auto',
    overflow: 'hidden',
    margin: '0 auto',
    display: 'block',
    // padding: '5% 5% 5% 5%'
}

export const submitButton = {
    marginLeft: 'calc(50% - 43px)'
} 




// proprietary styles:


export const welcomeGiftrLogo = {
    display: 'block',
    overflow: 'hidden',
    maxWidth: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 'auto',
}

export const welcomeLoginButton = { 
    marginLeft: 'calc(50% - 80px)'
}

export const welcomePitch = {
    textAlign: 'center', 
    margin: '10% 5% 0 5%'
} 

export const editableCard = {
    minHeight: '433px',
    maxHeight: '1050px',
    width: '300px',
}

export const wishForm ={
    zIndex: 1,
    paddingTop: "3em",
    marginLeft: '10%',
    marginRight: '10%'
}

export const navBar = {
    position: 'fixed',
    maxWidth: '100%',
    zIndex: "100"
}

export const notification = {
    overflowY: 'scroll',
    zIndex: 120,
    border: '1px solid grey',
    padding: '5px 5px 5px 5px',
    borderRadius: '5px',
    backgroundColor: '#FFFFFF',
    height: '300px',
    minWidth: '250px',
    width: '20%',
    right: '15px',
    top: '50px',
    position: 'fixed'
}


export const listDiv = {
    zIndex: 1,
    paddingTop: "3em",
    paddingBottom: "6em",
    textAlign: 'center'
}


export const uploadedImage = {
    height: '200px', width: 'auto', margin: ' 15px auto 15px auto', display: 'block', border: '1px dotted black', borderRadius: '3px', textAlign: 'center' 
}
export const dropZoneDiv = { height: '100px', width: '300px', margin: 'auto', display: 'block', border: '1px dotted black', borderRadius: '3px', textAlign: 'center' } 



// styling for when another user's profile is to be shown
export const userMainDiv = {
    margin: '3% auto auto auto',
    width: '50%',
    left: 0,
    right: 0,

}
export const userProfile = {
    maxWidth: '300px',
    margin: 'auto auto 5px auto'
}
export const buttonDiv = userProfile

// ----------------------

// Proprietary styling for Secret Santa

export const santaList = {
    textAlign: 'center',
    display: 'inline-block'
} 

export const calendarDiv = {
    display: 'inline-block',
    margin: 'auto auto 3em'
} 
// check line 343 of Santa Main