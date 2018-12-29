import Autosuggest from 'react-autosuggest'
import React from 'react'
import * as Adapter from '../Adapter'

export default class AutosuggestForm extends React.Component{

    
   getSuggestionValue = suggestion => suggestion.first_name;

//    async componentDidMount(){
//     const people = await Adapter.getUsersBySearchQuery('')
//     return this.setState({people})
//    }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : this.state.people.filter(person =>
      person.first_name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

    state={
        value: '',
        people: []
    }



    // getting pepel from the db and storing in state when starting search
    getSuggestions = async inputValue =>{
       const searchValue = inputValue.toLowerCase().trim().split('').filter(e=> e !== ' ').join('')
        return inputValue.length > 0 ? 
            this.state.people.length > 0 && this.state.people.map(p => <div>{p.first_name} {p.last_name}</div>)
        :
            []
     }

     getSuggestionValue = suggestion => {
        this.setState({selectedId: suggestion.id})
        return `${suggestion.first_name} ${suggestion.last_name}`
     }

     renderSuggestion = suggestion => (
        <div >
          {suggestion.first_name} {suggestion.last_name}
        </div>
      );
      

      onChange = async (event, { newValue }) => {
        const people = await Adapter.getUsersBySearchQuery(newValue)
        this.setState({people})
        this.setState({
          value: newValue
        });
      };

      
      onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          people: this.getSuggestions(value)
        });
        console.log('eeeeee')
      };
    

    onSuggestionsClearRequested = () => {
        this.setState({
          people: []
        });
      };


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
            <Autosuggest
              suggestions={people}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
            />
          );
        }
      }