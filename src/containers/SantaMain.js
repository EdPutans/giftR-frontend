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

    addUser = (user) => {
        if(!this.state.users.find(u=>u.id === user.id)){
            this.setState({ users: [...this.state.users, user] })
        }else{
            alert('User already on the list')
        }
        this.state.users.length > 0 && this.setState({ peopleSet: true })
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
                    friends={ this.props.friends }
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

    renderSantaForm = () => {
        const { budgetSet, peopleSet, randomizedSet, deadlineSet, calendarActive, users } = this.state
        const { currentUser, friends } = this.props

        return(<div>

            <h3>Create new Secret Santa</h3>
            <div style={ { margin: '0 3em 0 3em' } }>
                <div style={ { margin: '1em 0 1em 0' } }>
                1. Add people to the randomizer:
                </div>
                <AutosuggestForm
                    addUser={ this.addUser }
                />
            </div>
            {
                users.length > 0 &&
                <div>
                    <h4>Selected users:</h4>
                    { users.map(e =>
                        <div key={e.id} style={ { margin: '1em auto 0 auto' } }>
                            <div style={ { textAlign: 'center', display: 'inline-block' } } >
                                <Card
                                    description={ `${e.first_name} ${e.last_name}` }
                                    key={ e.id }
                                />
                            </div>
                        </div>
                    )

                    }
                </div>
            }
            <br />
            <div>
                {
                    (peopleSet || users.length > 1) &&
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
                (budgetSet && peopleSet && calendarActive) ?
                    <div>
                        <div style={ {
                            display: 'inline-block',
                            margin: 'auto auto 3em'
                        } }>
                            {
                                this.state.deadlineSet ?
                                    <h5>Change deadline:</h5>
                                    :
                                    <h5>3. Set deadline</h5>
                            }
                            <Calendar
                                onChange={ this.onCalendarChange }
                                value={ this.state.date }
                            />
                        </div>
                    </div>
                    :
                    (

                        <div>
                            <p>{ this.state.date && `Deadline: ${this.formatDate(this.state.date)}` }</p>
                            { !calendarActive &&
                                <div>
                                    <Button
                                        onClick={ this.toggleCalendar }
                                    >
                                        Change deadline
                                    </Button>
                                    <br />
                                </div>
                            }<br />
                        </div>
                    )

            }
            {
                (users.length < 2 || !peopleSet || !budgetSet || !deadlineSet) ?
                    <Button disabled >Randomize</Button>
                    :
                    <Button
                        color='teal'
                        onClick={ () => this.randomizer(this.mapIdsForRandomizer(this.state.users)) }
                    >
                        Randomize
                                    </Button>
            }
            <br />
            {
                this.state.mappedPeople && this.state.mappedPeople.map(u =>
                    <div key={u.id} style={ { margin: '2em auto 2em auto' } }>
                        <div
                            style={ { textAlign: 'center', display: 'inline-block' } }
                        >
                            <Card
                                header={ `${u.gifter.first_name} ${u.gifter.last_name} → ${u.receiver.first_name} ${u.receiver.last_name} ` }
                            />
                        </div>
                    </div>
                )
            }
            {
                randomizedSet &&
                <Button
                    onClick={ this.createSecretSanta }>
                    Complete secret santa
                    </Button>
            }<br />
            <Button

                onClick={ this.toggleNewSanta }
                basic
                color='red'
            >
                Cancel
                            </Button><br />


        </div>)

    }


    renderBoth = () => {
        const { budgetSet, peopleSet, randomizedSet, deadlineSet, calendarActive, users } = this.state
        const {currentUser, friends} = this.props
        return (
            <div>
               
                            < SantaList
                                currentUser={ currentUser }
                                friends={ friends }
                            />
                            {this.renderSantaForm()}
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
    