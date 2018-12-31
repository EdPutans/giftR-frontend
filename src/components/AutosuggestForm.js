import Autosuggest from 'react-autosuggest'
import React from 'react'
import * as Adapter from '../Adapter'
import {Button } from 'semantic-ui-react'
 
export default class AutosuggestForm extends React.Component{

    
   getSuggestionValue = suggestion => suggestion.first_name


    state={
        value: '',
        people: []
    }


    getSuggestions = async inputValue =>{
       const searchValue = inputValue.toLowerCase().trim().split('').filter(e=> e !== ' ').join('')
        return searchValue.length > 0 ? 
            this.state.people.length > 0 && this.state.people.map(p => <div>{p.first_name} {p.last_name}</div>)
        :
            []
     }

     handleAdd=(event)=>{
        event.preventDefault()
        this.state.selected && this.props.addUser(this.state.selected) && this.setState({selected: null})
     }

     getSuggestionValue = suggestion => {
        const {id, first_name, last_name} = suggestion
        this.setState({selected: {id, first_name, last_name }})
        return `${first_name} ${last_name}`
     }

     renderSuggestion = suggestion => (
        <div
            className="ui multiple search selection dropdown"

        >
          {suggestion.first_name} {suggestion.last_name}
        </div>
      )
      

      onChange = async (event, { newValue }) => {
        const people = await Adapter.getUsersBySearchQuery(newValue)
        this.setState({people})
        this.setState({
          value: newValue
        })
      }

      
      onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          people: this.getSuggestions(value)
        })
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
            <form className="ui form">
                <Autosuggest
                    suggestions={people}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                />
                <Button
                    onClick={e=>this.handleAdd(e)}
                >
                +
                </Button>
           
            </form>
          )
        }
      }