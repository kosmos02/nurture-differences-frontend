import React, { Component } from "react"
import "./App.css"
import Map from './components/worldmap'
import { CountryDetails } from './components/countryDetails'
import { Etiquette } from './components/etiquette'
import NavBar from './components/NavBar';
import Switch from 'react-switch'

export default class App extends Component {
  state = {
    data: [],
    currentCountry: '',
    isHoliday: true,
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
            "alpha3code":`${country.alpha3Code}`,
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
          <label>
            <span>{this.state.isHoliday ?  'Etiquette' : 'Holiday'}</span>
            <Switch 
              onChange={() => this.setState({isHoliday: !this.state.isHoliday})} 
              checked={this.state.isHoliday}
              offHandleColor='#c95ed6'
              onHandleColor='#6e70e1'
              />
          </label>
          
          {this.state.isHoliday?<CountryDetails
            currentCountry={this.state.currentCountry}
            currentCountryName={this.state.currentCountryName}
          />
          : <Etiquette data = {this.state} />}
        </div>
      </div>
    )
  };
}
