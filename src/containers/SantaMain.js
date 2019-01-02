import React from 'react'
import Header from '../components/Header'
import AutosuggestForm from '../components/AutosuggestForm'
import SantaList from '../components/SantaList'
import { Button, Grid, Card } from 'semantic-ui-react'
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
        calendarActive: true,
        newSantaActive: false,
        randomized: [],
        ids: [],
        budget: 0,
        users: [],
        date: null,
    }

    // --------------- Santa functionality -------------

    addUser = (value) => {
        !this.state.users.includes(value) && this.setState({ users: [...this.state.users, value] })
        // !this.state.ids.includes(value.id) && this.setState({ ids: [...this.state.ids, value.id] })
        this.state.users.length> 0 && this.setState({ peopleSet: true })

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
        this.setState({
            deadlineSet: true,
             calendarActive: false
            })
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
        console.log(resp)
        return this.props.history.push('/santa')
    }

    renderSantaList = () => {
        return (
            <div>
                < SantaList
                    currentUser={ this.props.currentUser }
                />
                <Button
                    onClick={ this.toggleNewSanta }
                    color='teal'
                >
                    Create New Santa
                  </Button>
            </div>
        )
    }

    formatDate = (date) => {
        // Not dry... yet!
        date = date.toString()
        return `${date.split(' ')[1]} ${date.split(' ')[0]} ${date.split(' ')[3]}`
    }


    toggleCalendar=()=>{
        this.setState({calendarActive: !this.state.calendarActive})
    }

    renderBoth = () => {
        const { budgetSet, peopleSet, randomizedSet, deadlineSet, calendarActive } = this.state
        return (
            <div>
                < Grid columns={ 2 } divided>
                    <Grid.Row>
                        <Grid.Column width={ 7 }>
                            < SantaList
                                currentUser={ this.props.currentUser }
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <h3>Create new Secret Santa</h3>
                            <div style={ { margin: '0 3em 0 3em' } }>
                                1. Add people to the randomizer:
                                <br />
                            <AutosuggestForm
                                    addUser={ this.addUser }
                                />
                            </div>
                            {
                                this.state.users.length > 0 &&
                                <div>
                                    <h4>Selected users:</h4>
                                    { this.state.users.map(e => 
                                    
                                                <Card
                                                    fluid
                                                    header={ `${e.first_name} ${e.last_name}` }
                                                    key={ e.id }
                                                />
                                        
                                    )

                                    }
                                </div>
                            }
                            <br />
                            <div>
                                {
                                   ( peopleSet || this.state.users.length> 1 ) &&
                                   <div>
                                    <h5>2. Set budget:</h5>
                                        £<div className='ui input'
                                        style={
                                            {
                                                marginBottom: '3em'

                                            }
                                        }
                                        >
                                            <input
                                                placeholder='budget'
                                                onChange={ event => this.budgetSet(event.target.value) }
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                            {
                                (budgetSet && peopleSet && calendarActive)?
                                <div>
                                    {
                                        this.state.deadlineSet? 
                                        <h5>Change deadline:</h5>
                                        : 
                                        <h5>3. Set deadline</h5>
                                    }
                                    <Calendar
                                        onChange={ this.onCalendarChange }
                                        value={ this.state.date }
                                    />
                                </div> 
                                :
                                (
                                    
                                    <div>
                                            <p>{ this.state.date && `Deadline: ${this.formatDate(this.state.date)}`}</p>
                                        {!calendarActive && 
                                        <Button 
                                            onClick={this.toggleCalendar}
                                        >
                                            Change deadline
                                        </Button>
                                        }</div>
                                )

                            }
                            {
                                (this.state.users.length < 2 || !peopleSet || !budgetSet || !deadlineSet) ?
                                    <Button disabled >Randomize</Button>
                                    :
                                    <Button
                                        color='teal'
                                        onClick={ () => this.randomizer(this.mapIdsForRandomizer(this.state.users)) }
                                    >
                                        Randomize
                    </Button>
                            }
                            {
                                this.state.mappedPeople && this.state.mappedPeople.map(u =>
                                    <div className='card' style={ { textAlign: 'center' } }>{ u.gifter.first_name } { u.gifter.last_name } ---> { u.receiver.first_name } </div>
                                )
                            }
                            {
                                randomizedSet &&
                                <Button
                                    onClick={ this.createSecretSanta }>
                                    Complete secret santa
                    </Button>
                            }
                            <Button
                                onClick={ this.toggleNewSanta }
                                basic
                                color='red'
                            >
                                Cancel
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid >
            </div>
        )
    }

    toggleNewSanta = () => {
        this.setState({ newSantaActive: !this.state.newSantaActive })
    }

    budgetSet = (value) => {
        this.setState({ budget: parseInt(value) })
        if (value > 0) {
            this.setState({ budgetSet: true })
        } else {
            this.setState({ budgetSet: false })
        }
    }

    render() {
        return (
            <div style={ {
                zIndex: 1,
                paddingTop: "3em",
                paddingBottom: "6em",
                textAlign: 'center'
            } }>
            <Header title={ 'Secret Santa' } />
            {this.state.newSantaActive ?
                this.renderBoth() : this.renderSantaList()
            }
            </div>
        )
    }

}
    