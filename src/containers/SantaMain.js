import React from 'react'
import Header from '../components/Header'
import AutosuggestForm from '../components/AutosuggestForm'
import SantaList from '../components/SantaList'
import { Button, Grid } from 'semantic-ui-react'
export default class SantaMain extends React.Component {

    state = {
        randomized: [],
        ids: []
    }


    addUser = (value) => {
        !this.state.ids.includes(value) &&
            this.setState({ ids: [...this.state.ids, {gifter:value}] })
    }

    randomizer = (passedArray) => {
        if(passedArray.length<2) {return;}
        let array = [...passedArray]
        let gifters = []
        
        let currentIndex = array.length, temporaryValue, randomIndex;
        array.forEach(object=> gifters.push(object.gifter) )
        let receivers = array.sort(e=>0.5-Math.random()).map(e=>e.gifter)
        console.log({receivers, gifters})
        
        if(receivers.find(id => receivers.indexOf(id) === gifters.indexOf(id)))
        {
            this.randomizer(passedArray)
        }else{
                let result = receivers.map(id => ({ 
                    receiver:id, 
                    gifter: gifters[gifters.indexOf(id)] 
                }))
                this.setState({randomized: result})
                return result
            }
        }
        
        randomizerMapper = () =>
        {


        }



    render() {

        return (
            <div style={{
                zIndex: 1,
                paddingTop: "3em",
                paddingBottom: "6em"
            }}>
                <Header title={'Secret Santa'} />

                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            
                            <div style={{margin: '0 3em 0 3em'}}>
                            Add people to the randomizer here:
                                <AutosuggestForm
                                    addUser={this.addUser}
                                />
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            {this.state.ids.length > 0 && <div>
                                 <h4>Selected users:</h4>
                                <div>
                                    {this.state.ids.map(e => e.gifter).join(',')}
                                    <br /> V <br />
                                    {this.state.randomized.length > 0 && this.state.randomized.map(e=>e.receiver).join(',')}<br />
                                    <Button onClick={e => this.randomizer(this.state.ids)}>Randomize</Button>
                                </div>
                            </div>}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

}