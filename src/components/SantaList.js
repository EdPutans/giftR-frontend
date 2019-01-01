import React from 'react'
import * as Adapter from '../Adapter'
import {Card} from 'semantic-ui-react'
import Header from './Header'

export default class SantaList extends React.Component {

    state={
        users: null
    }


    componentDidMount = async () => {
        if(this.props.currentUser){
            const santas = await Adapter.getUserSantas(this.props.currentUser.id)
            console.log({santas})
            if(!santas.error){
                const users = santas.map(s => { 
                    const {id, last_name, first_name, age, img_url} = s.receiver
                    const {deadline, budget} = s
                    return {id, last_name, first_name, age, img_url, deadline, budget}
                })
                this.setState({users})
            }
        }
       
    }

    formatDate=(date)=>{
        return `${date.split('-')[0].split(' ')[0]}-${date.split('-')[1]}-${date.split('-')[2].split('T')[0]}`
    }

    render(){
        const {users} = this.state
        return(
        <div style={{
            margin: 'auto auto auto 1em',
                       }}>
            <h3>Active</h3>
            { users && users.map(e => 
            <Card 
            style={{
                textAlign:'center',
                margin: '1em auto',
            }}
                header={`${e.first_name} ${e.last_name}`}
                meta={`Deadline on ${this.formatDate(e.deadline)}`}
                description={`Budget - £${e.budget}`}
            />)
            }
          
        </div>
        )
    }

}