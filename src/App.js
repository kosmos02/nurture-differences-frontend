import React, { Component } from "react"
import "./App.css"
import  Map  from './components/worldmap'
import { CountryDetails } from './components/countryDetails'

export default class App extends Component {

  render(){
    return(
      
      < div className="App" >
        < div className="Main">
          <Map />
          <CountryDetails />
        </div>
      </div>
    )};
}
