import {useState, useEffect} from 'react'

export function CountryDetails(props) {

const [holidays, setHolidays] = useState([])

let getCountryHolidays = (countryCode) => {
    const apiKey = 'c369527b-cd29-4772-b393-a0582fe866a8';
    let year = '2020';
    fetch(`https://holidayapi.com/v1/holidays/?key=${apiKey}&country=${countryCode}&year=${year}`)
        .then(response => response.json())
        .then(results => {
            setHolidays(results.holidays)
        })
}

useEffect(() => {
    getCountryHolidays(props.currentCountry)
})

let displayHolidays = (holidays) => {
    return holidays.map( holiday => <li>{holiday.name}</li> )
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