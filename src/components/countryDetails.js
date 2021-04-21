import {useState, useEffect} from 'react'

export function CountryDetails(props) {

const [holidays, setHolidays] = useState([])

let getCountryHolidays = (countryCode) => {
    const apiKey = '580d9214-e005-4391-9de5-8b111c8bbd0e';
    let year = '2020';
    fetch(`https://holidayapi.com/v1/holidays/?key=${apiKey}&country=${countryCode}&year=${year}`)
        .then(response => response.json())
        .then(results => {
            console.log(results)
            setHolidays(results.holidays)
        })
}

useEffect(() => {
    getCountryHolidays(props.currentCountry)
},[props.currentCountry])

let displayHolidays = (holidays) => {
    return holidays.map( holiday => <li>{holiday.name} date:{holiday.date}  {holiday.date !== holiday.observed ? `observed:${holiday.observed}` : null}</li> )
}

    return(
        <div className="country-details">
            <div className="name">
            </div>
            <ul>
                {displayHolidays(holidays)}
            </ul>
        </div>
    )
}