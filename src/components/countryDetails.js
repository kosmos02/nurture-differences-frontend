import {useState, useEffect} from 'react'

export function CountryDetails(props) {

const [holidays, setHolidays] = useState([])

let getCountryHolidays = (countryCode) => {
    const apiKey = '580d9214-e005-4391-9de5-8b111c8bbd0e';
    let year = '2020';
    // let year = new Date().getFullYear().toString();
    fetch(`https://holidayapi.com/v1/holidays/?key=${apiKey}&country=${countryCode}&year=${year}`)
    // fetch(`https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=${countryCode}&year=${year}`)
    // when using the API above, replace observed with holiday type
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
    return holidays.map( holiday => <div className="holiday"><div className="holidayName">{holiday.name}</div> <div className="holidayDate">{holiday.date}</div><div className="holidayObserved">{holiday.date !== holiday.observed ? holiday.observed : " "}</div></div> )
}

if (!!props.currentCountry) {
    return(
        <div className="country-details">
            <div className="name">{props.currentCountryName}</div>
            <div className="holidayHeader holiday"><div className="holidayName">Holiday</div><div className="holidayDate">Date</div><div className="holidayObserved">Observed</div></div>
            {displayHolidays(holidays)}
        </div>
    )
} else {
    return(
        null
    )
}
}