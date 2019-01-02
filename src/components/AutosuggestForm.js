import Autosuggest from 'react-autosuggest'
import React from 'react'
import * as Adapter from '../Adapter'
import {Button,Card} from 'semantic-ui-react'
 
export default class AutosuggestForm extends React.Component{

    
   getSuggestionValue = suggestion => suggestion.first_name


    state={
        value: '',
        people: []
    }


    getSuggestions = inputValue =>{
       const searchValue = inputValue.toLowerCase().trim().split('').filter(e=> e !== ' ').join('')
        return searchValue.length > 0 ? 
            this.state.people.length > 0 && this.state.people.map(p => 
            <div>
              {p.first_name} {p.last_name}
            </div>
            )
        :
            []
     }

  

     handleAdd=(event)=>{
        event.preventDefault()
        this.state.selected && this.props.addUser(this.state.selected) && this.setState({selected: null})
        this.setState({value: ''})
     }

     getSuggestionValue = suggestion => {
        const {id, first_name, last_name} = suggestion
        this.setState({selected: {id, first_name, last_name }})
        return `${first_name} ${last_name}`
     }

     renderSuggestion = suggestion => (
      <div style={{textAlign:'left'}}>
       
        <Card
           description={ `${suggestion.first_name} ${suggestion.last_name} ${this.props.users.find(u => u.id ===suggestion.id)? '(already on list)' : ""}`}
        />
      </div>
      )
      

      onChange = async (event, { newValue }) => {
        this.setState({
          value: newValue
        })
      }

      
      onSuggestionsFetchRequested = async ({ value }) => {
        let people
        try{
          people = await Adapter.getUsersBySearchQuery(value)
          people = people.filter(user => user.id !== this.props.currentUser.id)
        }catch(e){
          console.log('person not found')
        }
        this.setState({people})
      }
    

    onSuggestionsClearRequested = () => {
        this.setState({
          people: []
        })
      }


      render() {
        const { value, people } = this.state
    
        // Autosuggest will pass through all these props to the input.
        const inputProps = {
          placeholder: 'Type a person',
          value,
          onChange: this.onChange
        }
    
        // Finally, render it!
        return (
          <div 
          >
            <form className="ui form">
                <Autosuggest
                    suggestions={people}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                /><br />
                <div style={{margin:'0 0 3em 0'}}>
                <Button
                  color='teal'
                  basic
                  onClick={e=>this.handleAdd(e)}
                >
                  Add
                </Button>
                </div>
            </form>
            </div>
          )
        }
      }