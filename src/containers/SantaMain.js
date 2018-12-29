import React from 'react'
import Header from '../components/Header'
import AutosuggestForm from '../components/AutosuggestForm'
import SantaList from '../components/SantaList'
import {Button} from 'semantic-ui-react'
export default class SantaMain extends React.Component {

    state={
        randomized: [],
        ids: []
    }


    addId = (value) =>{
        !this.state.ids.includes(value) &&
        this.setState({ids: [...this.state.ids, value]})
    }

    randomizer=(passedArray)=>{
        let array =[...passedArray]
        let currentIndex = array.length, temporaryValue, randomIndex;

            while (0 !== currentIndex) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            console.log(array)
            this.setState({randomized:array})
    }
// add randomizer

    render(){

        return(
            <div style={ {
                zIndex: 1,
                paddingTop: "3em",
                paddingBottom: "6em"
            } }>
             <Header title={'Secret Santa'} />
             Add people to the randomizer here:
             <AutosuggestForm 
                addId={this.addId}
             />
            
            {this.state.ids.length>0 && <h4>Selected users:</h4>}
             <div>
                 {this.state.ids.map(e=>e).join(',')}
                 <br/>to<br/> 
                 {this.state.randomized.length>0 && this.state.randomized.join(',')}
                 <Button onClick={e=>this.randomizer(this.state.ids)}>Randomize</Button>
                 
             </div>
         </div>
        )
    }

}