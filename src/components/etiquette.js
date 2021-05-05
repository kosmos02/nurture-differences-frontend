import {useState,useEffect} from 'react'
import ReactTooltip from "react-tooltip";
const baseURL = 'http://localhost:3000/'
const sixDURl = `${baseURL}six_dimensions_cultures/`

export function Etiquette(props){
const {data} = props

const [countryScores, setCountryScores] = useState([])
// const [countryEtiquette,setCountryEtiquette] = useState([])
const [countryName,setCountryName] = useState('')

let fetchCountryScores = (data) => {
    let winner = data.data.filter((country)=> data.currentCountry === country.country)
        let country = winner[0].alpha3code
        fetch(`${sixDURl}${country}`)
            .then(response => response.json())
            .then(results => {
                let scores = [
                    {value: results?.idv || "No Data",
                     name: 'Individualist/Collectivist ',
                     description1: 'Highly invididualist socieities view their identities independant from others, social ties are loose, independance is more valued. Less exclusion.',
                     description2: 'Highly collectivist societities view their identity through ingroups, social ties are rigid, interdepedance is more valued. More exclusionist.'},
                    {value: results?.ivr || "No Data",
                     name: 'Indulgent/Restrained: ',
                     description1: 'Indulgent societies percieve freedom to do what you want to do as good.',
                     description2: 'Restrained societies prefer order, and view life through terms of responsibility/duty'},
                    {value: results?.ltowvs || "No Data",
                     name: 'Short-term values/Long-term values: ',
                     description1: 'Short-term oriented societies value national pride, respect for tradition, preservation of face, fulfilling social obligations',
                     description2: 'Long-term oriented societies value perseverance, thrift, and adapting to changing circumstances'},
                    {value: results?.mas || "No Data",
                     name: 'Expected emotional gender role: ',
                     description1: 'Highly emotionally gendered societies value material well-being, work over life balance, and men are expected to be tough and women to be modest.',
                     description2: 'They tend to admire the successful. In less emotionally gendered societies life balance matters, men and women both do emotional labor.'},
                    {value: results?.pdi || "No Data",
                     name: 'Power Difference: ',
                     description1: 'The percieved significance of the power difference is between subordinates and superiors.'},
                    {value: results?.uai || "No Data",
                     name: 'Uncertainty intolerance: ',
                     description1: 'Uncertainty intolerant societies feel anxiety and distrust when faced with the unknown or the ambiguous. The unknown is a threat.',
                     description2: 'Uncertainty accepting socities feel uncertaintity is normal, the unknown curious, rules aren\'t as important.'},
                ]
                setCountryName(results?.country)
                setCountryScores(scores)
            })
}

useEffect(()=> {
    console.log(data, data.currentCountry.length)
    if(data.currentCountry.length > 0){
        fetchCountryScores(data)
    }
},[data])

let displayScores = (scores) => {
    return scores.map((score) => (
        <div className="holiday">
            <div className="holidayName" data-tip data-for={score.name}>
                {score.name}
            </div>
            <ReactTooltip
                    id={score.name}
                    multiline='true'
                    place="top"
                    type="dark"
                    effect="solid"
                    backgroundColor="purple"
                >
                {score.description1}
                <br></br>
                {score?.description2}
            </ReactTooltip>
            <div>{score.value}</div>
        </div>
    ))
}
    return (
        <div className="etiquette-container">
            <div className="country-name">{countryName}</div>
                {displayScores(countryScores)}
        </div>
    )
}
