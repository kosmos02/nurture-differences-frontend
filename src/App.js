import React, { Component } from "react"
import "./App.css"
import { WorldMap } from "react-svg-worldmap"

export default class App extends Component {
  
  state = {
    data: []
  }

  colorCounter = 0;
  countries = []
  
  componentDidMount(){
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response =>response.json())
      .then(countries =>  {
        countries.forEach(country => {
        let newCountry = {
          "country": `${country.alpha2Code}`,
          "value": this.colorCounter
        }
        this.countries = [...this.countries, newCountry]
        this.colorCounter++
      })
      console.log(this.countries)
        this.setState({
          data: this.countries
        })
    });
      
      
  };
    
  stylingFunction = (context) => {
    const opacityLevel = 0.1 + (1.5 * (context.countryValue - context.minValue) / (context.maxValue - context.minValue))
    return { fill: context.country === "US" ? "blue" : context.color, fillOpacity: opacityLevel, stroke: "green", strokeWidth: 1, strokeOpacity: 0.2, cursor: "pointer" }
  }

  tooltipText = (text) => {
    console.log(text)
  }

  render(){
    return(
      
      < div className="App" >
        < div className="Main">
          
                  <WorldMap 
                  color={"green"}
                  backgroundColor='lightgreen' 
                  tooltipBgColor={"purple"}
                  tooltipTextFunction={this.tooltipText}
                  title="ALLiday Map" 
                  valueSuffix="points" 
                  size="xl" 
                  data={this.state.data} 
                  frame={false} 
                  styleFunction={this.stylingFunction}
                  />
                
        </div>
      </div>
    )};
}
