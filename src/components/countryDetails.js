import {useState, useEffect} from 'react'
import rightArrow from '../assets/nav-right.svg'
import leftArrow from '../assets/nav-left.svg'


export function CountryDetails(props) {

const [holidays, setHolidays] = useState([])

let getCountryHolidays = (countryCode) => {
    // let year = '2020';
    let year = new Date().getFullYear().toString();
    let month = (new Date().getMonth() + 1).toString();
    
    //Holiday API key
    // const apiKey = '580d9214-e005-4391-9de5-8b111c8bbd0e';
    // fetch(`https://holidayapi.com/v1/holidays/?key=${apiKey}&country=${countryCode}&year=${year}`)
    //Calendarific API key
    const apiKey = 'a207d49e5afb124557eee979ab1b7ca2cc315135';
    fetch(`https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=${countryCode}&year=${year}&month=${month}`)
    // when using the API above, replace observed with holiday type
        .then(response => response.json())
        .then(results => {
            console.log(results)
            setHolidays(results.response.holidays)
        })
}

useEffect(() => {
    getCountryHolidays(props.currentCountry)
},[props.currentCountry])

let displayHolidays = (holidays) => {
    // return holidays.map( holiday => <div className="holiday"><div className="holidayName">{holiday.name}</div> <div className="holidayDate">{holiday.date}</div><div className="holidayObserved">{holiday.date !== holiday.observed ? holiday.observed : " "}</div></div> )
    return holidays.map( holiday => <div className="holiday"><div className="holidayName">{holiday.name}</div> <div className="holidayDate">{holiday.date.iso}</div><div className="holidayType">{holiday.type[0]}</div></div> )
}

// if (props.currentCountry !== "") {
if (!!props.currentCountry) {
    console.log(holidays)
    return(
        <div className="country-details">
            <div className="name">{props.currentCountryName}</div>
            <div className="holidayHeader holiday"><div className="holidayName">Holiday</div><div className="holidayDate"><img className="arrow" src={leftArrow} alt="Previous month"></img>{new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear().toString()}<img className="arrow" src={rightArrow} alt="Next month"></img></div><div className="holidayType">Type</div></div>
            {displayHolidays(holidays)}
        </div>
    )
} else {
    console.log("not rendering country details")
    return(
        null
    )
}
}