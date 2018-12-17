import React from 'react'
import { Card } from 'semantic-ui-react'
export default class SearchArea extends React.Component{

componentWillReceiveProps= () => {
    console.log('updated component SearchArea')
}

render(){
    return(<div>
        {/* {this.props.users.length === 0 && this.props.search ? "No users found" : ""} */}
        {this.props.users && this.props.users.map(u => 
            <div><Card 
                fluid 
                color='red' 
                header={ 
                    (u.first_name ? u.first_name : "") + ' ' + (u.last_name ? u.last_name : "") } 
                meta={u.gifts.length + "wishes total"}
            />
         </div>
        )}
    </div>)
}
}