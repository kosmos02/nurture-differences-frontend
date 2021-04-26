import { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import rightArrow from '../assets/nav-right.svg'
import leftArrow from '../assets/nav-left.svg'

export function CountryDetails(props) {
	const [holidays, setHolidays] = useState([]);
	const [year, setYear] = useState(new Date().getFullYear().toString())
	const [month, setMonth] = useState((new Date().getMonth() + 1).toString())
	let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

	let getCountryHolidays = (countryCode) => {
		//Holiday API key
		// const apiKey = '580d9214-e005-4391-9de5-8b111c8bbd0e';
		// fetch(`https://holidayapi.com/v1/holidays/?key=${apiKey}&country=${countryCode}&year=${year}`)
		// when using the Holiday API, need replace holiday type with observed date

		//Calendarific API key
		const apiKey = 'a207d49e5afb124557eee979ab1b7ca2cc315135';
		fetch(`https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=${countryCode}&year=${year}&month=${month}`)
			.then(response => response.json())
			.then(results => {
				console.log(results)
				setHolidays(results.response.holidays)
			})
	}

	useEffect(() => {
		getCountryHolidays(props.currentCountry);
	},[props.currentCountry, month]);

	function handlePrevClick() {
		let prevMonth = parseInt(month) - 1
		if (prevMonth <= 0) {
			prevMonth = "12"
			let prevYear = (parseInt(year) - 1).toString()
			setMonth(prevMonth)
			setYear(prevYear)
		} else {
			setMonth(prevMonth.toString())
		}
	}

	function handleNextClick() {
		let nextMonth = parseInt(month) + 1
		if (nextMonth >= 13) {
			nextMonth = "1"
			let nextYear = (parseInt(year) + 1).toString()
			setMonth(nextMonth)
			setYear(nextYear)
		} else {
			setMonth(nextMonth.toString())
		}
	}

	let displayHolidays = (holidays) => {
		//Holiday API
		// return holidays.map( holiday => <div className="holiday"><div className="holidayName">{holiday.name}</div> <div className="holidayDate">{holiday.date}</div><div className="holidayObserved">{holiday.date !== holiday.observed ? holiday.observed : " "}</div></div> )

		//Calendarific API
		return holidays.map((holiday, index) => (
			<div className="holiday" key={index}>
				<div className="holidayName" data-tip data-for={holiday.name}>
					{holiday.name}
				</div>{" "}
				<ReactTooltip
					id={holiday.name}
                    multiline='true'
					place="right"
					type="dark"
					effect="solid"
                    backgroundColor="purple"
				>
					{holiday.description}
				</ReactTooltip>
				<div className="holidayDate">{holiday.date.iso}</div>
				<div className="holidayType">{holiday.type[0]}</div>
			</div>
		));
	};

	// if (props.currentCountry !== "") {
	if (!!holidays) {
		return (
			<div className="country-details">
				<div className="name">{props.currentCountryName}</div>
				<div className="holidayHeader holiday">
					<div className="holidayName">Holiday</div>
					<img className="arrow arrow-left" src={leftArrow} alt="Previous month" onClick={handlePrevClick}></img>
					<div className="holidayDate" style={{width: '10rem'}}> {months[month-1]} {year} </div>
					<img className="arrow arrow-right" src={rightArrow} alt="Next month" onClick={handleNextClick}></img>
					<div className="holidayType">Type</div>
				</div>
				{displayHolidays(holidays)}
			</div>
		);
	} else {
		return null;
	}
}
