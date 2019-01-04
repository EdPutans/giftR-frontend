import React from 'react'
import Header from '../components/Header'
import AutosuggestForm from '../components/AutosuggestForm'
import SantaList from '../components/SantaList'
import { Button, Card, Checkbox } from 'semantic-ui-react'
import Calendar from 'react-calendar'
import * as Adapter from '../Adapter'
// import {Animate} from 'react-simple-animate'
import * as animate from '../Animations'
import * as Styles from '../Styles'


// After trying to render a ton of components which can not realistically be reused, I created a bunch of functions to make the final render methods look crispy and readable.




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
        if (!this.state.users.find(u => u.id === user.id)) {
            this.setState({ users: [...this.state.users, user] })
        }
        return;
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


    onCalendarChange = date => {
        this.setState({ date })
        this.setState({
            deadlineSet: true,
             calendarActive: false
            })
    }

    formatDate = (date) => {
        // Not dry... yet!
        date = date.toString()
        return `${date.split(' ')[1]} ${date.split(' ')[0]} ${date.split(' ')[3]}`
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
            animate.fade(
                <div>
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
                </div>
            )
        )
    }

    handleCheckboxIncludeSelf = ()=>{
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


    toggleCalendar=()=>{
        this.setState({calendarActive: !this.state.calendarActive})
    }


    // --------- render methods ---------//

    renderCalendar = () => {
        const { budgetSet, calendarActive, deadlineSet, date } = this.state
        const {toggleCalendar, animateFade, onCalendarChange} = this;
        return ((budgetSet && calendarActive) ?
            <div>
                <div style={ {
                    display: 'inline-block',
                    margin: 'auto auto 3em'
                } }>
                    {
                        deadlineSet ?
                            <h5>Change deadline:</h5>
                            :
                            <h5>3. Set deadline</h5>
                    }

                    { animateFade(<Calendar
                        locale='en-EN'
                        onChange={ onCalendarChange }
                        value={ date }
                    />) }
                </div>
            </div>
            :
            (
                animateFade(
                    <div>
                        <p>{ date && `Deadline: ${this.formatDate(date)}` }</p>
                        { !calendarActive &&
                            <div>
                                <Button
                                    size='tiny'
                                    onClick={ toggleCalendar }
                                >
                                    Change deadline
                                    </Button>
                                <br />
                            </div>
                        }<br />
                    </div>
                )
            ))
    }
    


    renderSelectedUsers = () => {
        const { users } = this.state
        return (
            users.length > 0 &&
                <div>

                    { animate.fade(<h4>Selected users:</h4>) }

                    { users.map(e =>
                        <div key={ e.id } style={ { margin: '1em auto 0 auto' } }>
                            { animate.santaList(
                                <div style={ { textAlign: 'center', display: 'inline-block' } } >
                                    <Card
                                        description={ `${e.first_name} ${e.last_name}` }
                                        key={ e.id }
                                    />
                                </div>
                            ) }
                        </div>
                    )

                    }
                </div>
        )
    }


    renderRandomizedPeople = () => {
        return this.state.mappedPeople && this.state.mappedPeople.map(u => {
            return <div key={ u.id } style={ { margin: '2em auto 2em auto' } }>
                <div
                    style={ { textAlign: 'center', display: 'inline-block' } }
                >
                    { animate.fade(
                        <Card
                            header={ `${u.gifter.first_name} ${u.gifter.last_name} → ${u.receiver.first_name} ${u.receiver.last_name} ` }
                        />
                    ) }

                </div>
            </div>
        }
        )
    }



    renderSantaListAndForm = () => {
        const { currentUser, friends } = this.props
        return (
            <div>

                < SantaList
                    currentUser={ currentUser }
                    friends={ friends }
                />
                { this.renderSantaForm() }
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


    renderBudgetSetter=()=>{
        return <div>
            {
                (this.state.users.length > 1) &&
                animate.fade(<div>
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
    }
    

    renderRandomizedButton=() => {
        const { users, budgetSet, deadlineSet, randomizedSet} = this.state
        return ((users.length < 2 || !budgetSet || !deadlineSet) ?
            <div style={ Styles.betweenTwo1ems }>
                <Button disabled >Randomize list</Button>
            </div>
            :

            
            <div style={ Styles.betweenTwo1ems }>
                <Button
                    color='teal'
                    basic
                    size='big'
                    onClick={ () => this.randomizer(this.mapIdsForRandomizer(users)) }
                >
                    { randomizedSet ? 'Randomize again' : 'Randomize list' }
                </Button>
            </div>)
    }


    renderSantaForm = () => {
        const { self, randomizedSet, users } = this.state
       
        return animate.down(<div>

            <h3>Create new Secret Santa</h3>
            <div style={ { margin: '0 3em 0 3em' } }>
                <div style={ Styles.betweenTwo1ems }>
                    1. Add people to the randomizer:
                 </div>
                <AutosuggestForm
                    currentUser={this.props.currentUser}
                    users={users}
                    addUser={ this.addUser }
                />
                <Checkbox
                    name='Include myself' 
                    label='Include myself'
                    checked={self===true}
                    onChange={ () => this.handleCheckboxIncludeSelf() }
                ></Checkbox>
                
            </div>
            {
                this.renderSelectedUsers()
            }

            {
                this.renderBudgetSetter()
            }
                
            <br />
            {
                this.renderCalendar()
            }

            {
                this.renderRandomizedPeople()
            }
           
            {
                this.renderRandomizedButton()
            }

            <br />
            { this.state.done && animate.fade(<h4>Secret Santa created. Now hold on to your shoes...</h4>)}
            {
                randomizedSet &&
                <div style={ Styles.betweenTwo1ems }>
                    <Button
                        onClick={ this.createSecretSanta }
                        color='teal'
                        size='huge'
                    >
                        Complete secret santa
                    </Button>
                </div>
            }<br />
            <div style={ Styles.betweenTwo1ems }>
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

// ----------------------final renderer------//


    render() {
        return (
            <div style={ {
                zIndex: 1,
                paddingTop: "3em",
                paddingBottom: "6em",
                textAlign: 'center'
            } }>
                <Header title={ 'Secret Santa' } />
                { this.state.newSantaActive ?
                    this.renderSantaListAndForm() : this.renderSantaList()
                }
            </div>
        )
    }

}
    