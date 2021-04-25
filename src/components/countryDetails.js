import { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

export function CountryDetails(props) {
	const [holidays, setHolidays] = useState([]);

	let getCountryHolidays = (countryCode) => {

		let year = new Date().getFullYear().toString();

		const apiKey = "a207d49e5afb124557eee979ab1b7ca2cc315135";
		fetch(`https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=${countryCode}&year=${year}`)
			.then((response) => response.json())
			.then((results) => {
				setHolidays(results.response.holidays);
			});
	};

	useEffect(() => {
		getCountryHolidays(props.currentCountry);
	},[props.currentCountry]);

	let displayHolidays = (holidays) => {
		return holidays.map((holiday) => (
			<div className="holiday">
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

	if (!!holidays) {
		return (
			<div className="country-details">
				<div className="name">{props.currentCountryName}</div>
				<div className="holidayHeader holiday">
					<div className="holidayName">Holiday</div>
					<div className="holidayDate">Date</div>
					<div className="holidayType">Type</div>
				</div>
				{displayHolidays(holidays)}
			</div>
		);
	} else {
		return null;
	}
}
