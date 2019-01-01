import React from 'react'
import * as Adapter from '../Adapter'

export default class SantaList extends React.Component {

    state={
        users: null
    }


    componentDidMount = async () => {
        if(this.props.currentUser){
            const santas = await Adapter.getUserSantas(this.props.currentUser.id)
            console.log({santas})
            if(!santas.error){
                const users = santas.map(s => `${s.receiver.first_name} ${s.receiver.last_name}`)
                this.setState({users})
            }
        }
       
    }

    render(){
        const {users} = this.state
        return(
        <div>
          {users && users.map(e=> e)}
        </div>
        )
    }

}