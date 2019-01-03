import React from 'react'
import Header from '../components/Header'
import AutosuggestForm from '../components/AutosuggestForm'
import SantaList from '../components/SantaList'
import { Button, Grid, Card, Checkbox } from 'semantic-ui-react'
import Calendar from 'react-calendar'
import * as Adapter from '../Adapter'
import {Animate} from 'react-simple-animate'

export default class SantaMain extends React.Component {

    state = {
        self: false,
        // steps:
        deadlineSet: false,
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
        }
        return ;
    }


    animateList = (component) => {
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

    animateDown = (component) => {
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


    animateMe = (component) => {
        return <Animate
            play={true}
            startStyle={{"opacity":0}}
            endStyle={{"opacity":1}}
            durationSeconds="0.2"
            delaySeconds='0.1'
        >
        {component}
         </Animate>
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
        this.setState({ done: true })
        this.redirectBack()
        // return this.props.history.push('/santa')
    }

    redirectBack = () =>{
        return setTimeout(() => this.props.history.push('/santa'), 4000)
    }

    renderSantaList = () => {
        return (
            this.animateMe(<div>
                < SantaList
                    friends={ this.props.friends }
                    currentUser={ this.props.currentUser }
                />
                  
                <Button
                    onClick={ this.toggleNewSanta }
                    color='teal'
                >
                    New Secret Santa
                  </Button> 
            </div>)
        )
    }

    handleSelfTick=()=>{
        // has to be opposute!!!
        if(this.state.self){
            let users = JSON.stringify(this.state.users)
            users = JSON.parse(users)
            users = users.filter(user=>user.id !== this.props.currentUser.id)
            this.setState({users})
        }else{
            let users = JSON.stringify(this.state.users)
            users = JSON.parse(users)
            users.push(this.props.currentUser)
            this.setState({ users })
        }
        this.setState({ self: !this.state.self })

        
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
        const { budgetSet,  randomizedSet, deadlineSet, calendarActive, users } = this.state
       

        return this.animateDown(<div>

            <h3>Create new Secret Santa</h3>
            <div style={ { margin: '0 3em 0 3em' } }>
                <div style={ { margin: '1em 0 1em 0' } }>

                
                1. Add people to the randomizer:
                </div>
                <AutosuggestForm
                    currentUser={this.props.currentUser}
                    users={this.state.users}
                    addUser={ this.addUser }
                />
                <Checkbox
                    name='Include myself' 
                    label='Include myself'
                    checked={this.state.self===true}
                    onChange={ () => this.handleSelfTick() }
                ></Checkbox>
            </div>
            {
                users.length > 0 &&
                <div>
                     
                    {this.animateMe(<h4>Selected users:</h4>)}
                    
                    { users.map(e =>
                        <div key={e.id} style={ { margin: '1em auto 0 auto' } }>
                            {this.animateList(
                            <div style={ { textAlign: 'center', display: 'inline-block' } } >
                                <Card
                                    description={ `${e.first_name} ${e.last_name}` }
                                    key={ e.id }
                                />
                            </div>
                            )}
                        </div>
                    )

                    }
                </div>
            }
            <br />
            <div>
                {
                    (users.length > 1) &&
                    this.animateMe(<div>
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
                                type='number'
                                maxLength='4'
                                onChange={ event => this.budgetSet(event.target.value) }
                            />
                        </div>
                    </div>)
                }
            </div>
            {
                (budgetSet && calendarActive) ?
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
                        
                            {this.animateMe(<Calendar
                                locale='en-EN'
                                onChange={ this.onCalendarChange }
                                value={ this.state.date }
                            />)}
                        </div>
                    </div>
                    :
                    (
                        this.animateMe(
                        <div>
                            <p>{ this.state.date && `Deadline: ${this.formatDate(this.state.date)}` }</p>
                            { !calendarActive &&
                                <div>
                                    <Button
                                        size='tiny'
                                        onClick={ this.toggleCalendar }
                                    >
                                        Change deadline
                                    </Button>
                                    <br />
                                </div>
                            }<br />
                        </div>
                        )
                    )

            }
           
            {
                this.state.mappedPeople && this.state.mappedPeople.map(u =>
                    { 
                        return <div key={u.id} style={ { margin: '2em auto 2em auto' } }>
                        <div
                            style={ { textAlign: 'center', display: 'inline-block' } }
                        >
                        {this.animateMe(
                            <Card
                                header={ `${u.gifter.first_name} ${u.gifter.last_name} → ${u.receiver.first_name} ${u.receiver.last_name} ` }
                            />
                        )}

                        </div>
                    </div>
                    }
                )
            }
            {
                (users.length < 2 || !budgetSet || !deadlineSet) ?
                    <div style={ { margin: '1em 0 1em 0' } }>
                        <Button disabled >Randomize list</Button>
                    </div>
                    :
                    <div style={ { margin: '1em 0 1em 0' } }>
                        <Button
                            color='teal'
                            basic
                            size='big'
                            onClick={ () => this.randomizer(this.mapIdsForRandomizer(this.state.users)) }
                        >
                            {this.state.randomizedSet? 'Randomize again' : 'Randomize list' }
                        </Button>
                     </div>
            }
            <br />
            { this.state.done && this.animateMe(<h4>Secret Santa created. Now hold on to your shoes...</h4>)}
            {
                randomizedSet &&
                <div style={ { margin: '1em 0 1em 0' } }>
                    <Button
                        onClick={ this.createSecretSanta }
                        color='teal'
                        size='huge'
                    >
                        Complete secret santa
                    </Button>
                </div>
            }<br />
            <div style={ { margin: '1em 0 1em 0' } }>
                <Button
                onClick={ this.toggleNewSanta }
                basic
                size='tiny'
                color='red'
            >
                Cancel
            </Button>
            </div>

        </div>)

    }


    renderBoth = () => {
        
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
    