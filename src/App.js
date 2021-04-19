import React, { Component } from "react"
import "./App.css"
import { WorldMap } from "react-svg-worldmap"

export default class App extends Component {
  
  state = {
    data: []
  }

  colorCounter = 0;
  
  componentDidMount(){
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response =>response.json())
      .then(countries =>  countries.map(country => {
        let newCountry = {
          "country": `${country.alpha2Code}`,
          "value": this.colorCounter
        }
        this.setState({
          data: [...this.state.data, newCountry]
        })
      }));
      this.colorCounter++;
  
  };
    
  stylingFunction = (context) => {
    console.log(context);
    const opacityLevel = 0.1 + (1.5 * (context.countryValue - context.minValue) / (context.maxValue - context.minValue))
    return { fill: context.country === "US" ? "blue" : context.color, fillOpacity: opacityLevel, stroke: "green", strokeWidth: 1, strokeOpacity: 0.2, cursor: "pointer" }
  }

  render(){
    return(
      
      < div className="App" >
        < div className="Main">
          {/* <table>
            <tbody>
              <tr>
                <td> */}
                  <WorldMap 
                  color={"red"} 
                  tooltipBgColor={"#D3D3D3"} 
                  title="Custom Style Test" 
                  valueSuffix="points" 
                  size="xl" 
                  data={this.state.data} 
                  frame={true} 
                  styleFunction={this.stylingFunction}
                  />
                {/* </td>
              </tr>
            </tbody>
          </table> */}
        </div>
      </div>
    )};
}
