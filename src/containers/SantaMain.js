import React from 'react'
import Header from '../components/Header'
import AutosuggestForm from '../components/AutosuggestForm'

export default class SantaMain extends React.Component {

    render(){

        return(
            <div style={ {
                zIndex: 1,
                paddingTop: "3em",
                paddingBottom: "6em"
            } }>
             <Header title={'Secret Santa'} />
             <AutosuggestForm />
             <div>under le constructionnn</div>
         </div>
        )
    }

}