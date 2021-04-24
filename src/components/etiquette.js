import {useState,useEffect} from 'react'
const baseURL = 'http://localhost:3000/'
const sixDURl = `${baseURL}six_dimensions_cultures/`

export function Etiquette(props){
const {data} = props
const [countryScores,setCountryScores] = useState([])
const [countryEtiquitte,setCountryEtiquette] = useState([])

let fetchCountryScores = (data) => {
    let winner = data.data.filter((country)=> data.currentCountry === country.country)
        let country = winner[0].alpha3code
        fetch(`${sixDURl}${country}`)
            .then(response => response.json())
            .then(results => {
                console.log(results)
            })
}

useEffect(()=> {
    if(data.currentCountry !== ''){
        fetchCountryScores(data)
    }
},[data])

    return (
        <div className="etiquette-container">

        </div>
    )
}