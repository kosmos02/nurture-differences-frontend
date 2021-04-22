import React, { Component } from "react"
import "./App.css"
import Map from './components/worldmap'
import { CountryDetails } from './components/countryDetails'
import NavBar from './components/NavBar';

export default class App extends Component {
  state = {
    data: [],
    currentCountry: ''
  }

  colorCounter = 1;
  countries = []

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(countries => {
        countries.forEach(country => {
          let newCountry = {
            "country": `${country.alpha2Code}`,
            "value": this.colorCounter
          }
          this.countries = [...this.countries, newCountry]
          this.colorCounter++
        })
        this.setState({
          data: this.countries
        })
      });
  };

  selectCountry = (event, countryName, isoCode, value) => {
    this.setState({currentCountry: `${isoCode}`, currentCountryName: `${countryName}`})
  }

  render() {
    return (

      < div className="App" >
        < div className="Main">
          <NavBar />
          <h1>   </h1>
          <Map
            data={this.state.data}
            selectCountry={this.selectCountry}
            />
          <CountryDetails
            currentCountry={this.state.currentCountry}
            currentCountryName={this.state.currentCountryName}
          />
        </div>
      </div>
    )
  };
}
