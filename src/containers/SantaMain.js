import React from 'react'
import Header from '../components/Header'
import AutosuggestForm from '../components/AutosuggestForm'
import SantaList from '../components/SantaList'
import { Button, Grid } from 'semantic-ui-react'
export default class SantaMain extends React.Component {

    state = {
        randomized: [],
        ids: [],
        users:[]
    }


    addUser = (value) => {
        !this.state.users.includes(value) && this.setState({users: [...this.state.users, value]})
        !this.state.ids.includes(value.id) &&
            this.setState({ ids: [...this.state.ids, value.id] })
    }


    mapIdsForRandomizer=(objectArray)=>{
        return objectArray.map(o=>o.id)
    }

    randomizer = (passedArray) => {
        if(passedArray.length<2) {return;}
        let array = [...passedArray]
        let gifters = [...passedArray]
        
        
        let receivers = array.sort(e=>0.5-Math.random())
        console.log({receivers, gifters})
        
        if(receivers.find(id => receivers.indexOf(id) === gifters.indexOf(id)))
        {
            this.randomizer(passedArray)
        }else{
                let result = receivers.map(id => ({ 
                    receiver_id:id, 
                    gifter_id: gifters[receivers.indexOf(id)] 
                }))
                this.setState({randomized: result})
                console.log(result)
                let mappedPeople = this.mapRandomizedToPeople(result)
                this.setState({mappedPeople})
                return result
            }
        }
    

        mapRandomizedToPeople = (arg) =>{
            let mapper = arg.map(obj => {
                let receiver = this.state.users.find(u => u.id === obj.receiver_id)
                let gifter = this.state.users.find(u => u.id === obj.gifter_id)
                console.log('mapped:',{receiver, gifter})
                return ({gifter, receiver})
            })
            console.log('mapped pepel: ', mapper)
            return mapper
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
                                    {this.state.users.map(e => e.id).join(',')}
                                    <br /> V <br />
                                    {this.state.randomized.length > 0 && this.state.randomized.map(e=>e.receiver_id).join(',')}<br />
                                    {
                                        this.state.mappedPeople && this.state.mappedPeople.map(u => 
                                            <div>{u.gifter.first_name} to {u.receiver.first_name} </div>
                                        )

                                    }


                                    <Button onClick={e => this.randomizer(this.mapIdsForRandomizer(this.state.users))}>Randomize</Button>
                                </div>
                            </div>}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

}