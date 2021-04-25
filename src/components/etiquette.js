import {useState,useEffect} from 'react'
const baseURL = 'http://localhost:3000/'
const sixDURl = `${baseURL}six_dimensions_cultures/`

export function Etiquette(props){
const {data} = props
// const [countryScores,setCountryScores] = useState([])
// const [countryEtiquitte,setCountryEtiquette] = useState([])

let fetchCountryScores = (data) => {
    console.log(data, 'fetchCountryScores')
    let winner = data.data.filter((country)=> data.currentCountry === country)
console.log(winner,'winner')
    // fetch(`${sixDURl}${currentCountry}`)
    //     .then(response => JSON.parse(response))
    //     .then(console.log)
}

useEffect(()=> {
    fetchCountryScores(data)
})

    return (
        <div className="etiquette-container">

        </div>
    )
}