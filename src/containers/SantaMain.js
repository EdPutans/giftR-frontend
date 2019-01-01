import React from 'react'
import Header from '../components/Header'
import AutosuggestForm from '../components/AutosuggestForm'
import SantaList from '../components/SantaList'
import { Button, Grid } from 'semantic-ui-react'
import Calendar from 'react-calendar'
import * as Adapter from '../Adapter'


export default class SantaMain extends React.Component {

    state = {
        // steps:
        deadlineSet: false,
        peopleSet: false,
        randomizedSet: false,
        budgetSet: false,
        // actual state:
        randomized: [],
        ids: [],
        budget: 0,
        users: [],
        date: new Date()
    }

    // --------------- Santa functionality -------------

    addUser = (value) => {
        !this.state.users.includes(value) && this.setState({ users: [...this.state.users, value] })
        this.state.users.length > 0 && this.setState({ peopleSet: true })
        !this.state.ids.includes(value.id) &&
            this.setState({ ids: [...this.state.ids, value.id] })
    }

    mapIdsForRandomizer = (objectArray) => {
        return objectArray.map(o => o.id)
    }

    randomizer = (passedArray) => {
        if (passedArray.length < 2) { return; }
        let array = [...passedArray]
        let gifters = [...passedArray]


        let receivers = array.sort(e => 0.5 - Math.random())

        if (receivers.find(id => receivers.indexOf(id) === gifters.indexOf(id))) {
            this.randomizer(passedArray)
        } else {
            let result = receivers.map(id => ({
                receiver_id: id,
                gifter_id: gifters[receivers.indexOf(id)]
            }))
            this.setState({ randomized: result })
            let mappedPeople = this.mapRandomizedToPeople(result)
            this.setState({ mappedPeople, randomizedSet: true })
            return result
        }
    }


    mapRandomizedToPeople = (arg) => {
        let mapper = arg.map(obj => {
            let receiver = this.state.users.find(u => u.id === obj.receiver_id)
            let gifter = this.state.users.find(u => u.id === obj.gifter_id)
            return ({ gifter, receiver })
        })
        return mapper
    }

    // --------------- external functions -------------

    onCalendarChange = date => {
        this.setState({ date })
        this.setState({ deadlineSet: true })
    }

    createSecretSanta = async () => {
        let { date, randomized, budget } = this.state
        let deadline = [date.getYear() + 1900, date.getMonth() + 1, date.getDate()]
        let body = {
            list: randomized,
            deadline,
            budget
        }
        const resp = await Adapter.createSantaList(body)
        return console.log(resp)


    }


    budgetSet = (value) => {
        this.setState({ budget: parseInt(value) })
        if (this.state.budget && this.state.budget > 0) {
            this.setState({ budgetSet: true })
        }
    }

    render() {
        const { budgetSet, peopleSet, randomizedSet, deadlineSet } = this.state
        return (
            <div style={{
                zIndex: 1,
                paddingTop: "3em",
                paddingBottom: "6em",
                textAlign: 'center'
            }}>
                <Header title={'Secret dSanta'} />
                <div style={{ margin: '0 3em 0 3em' }}>
                    Add people to the randomizer here:
                      <AutosuggestForm
                        addUser={this.addUser}
                    />
                </div>
                {
                    this.state.ids.length > 0 && 
                    <div>
                        <h4>Selected users:</h4>
                        {
                            this.state.users.map(e => <div>{e.first_name} {e.last_name}<br /></div>)
                        }
                    </div>
                }   
                <br />
                <div>
                    {
                    peopleSet && 
                    <input
                        placeholder='budget'
                        onChange={event => this.budgetSet(event.target.value)}
                    />
                    }
                </div>
                {
                    (budgetSet && peopleSet) && 
                    <div>
                        <Calendar
                            onChange={this.onCalendarChange}
                            value={this.state.date}
                        />
                    </div>
                }
                {
                    (this.state.users.length < 2 || !peopleSet || !budgetSet || !deadlineSet) ?
                     <Button disabled >Randomize</Button> 
                    :
                    <Button 
                        onClick={() => this.randomizer(this.mapIdsForRandomizer(this.state.users))}
                    >
                    Randomize
                    </Button>
                }
                {
                    this.state.mappedPeople && this.state.mappedPeople.map(u =>
                        <div style={{ textAlign: 'center' }}>{u.gifter.first_name} {u.gifter.last_name} ---> {u.receiver.first_name} </div>
                    )
                }
                {
                    randomizedSet &&
                    <Button 
                    onClick={this.createSecretSanta}>
                        Complete secret santa
                    </Button>
                }

            </div>
        )
    }

}