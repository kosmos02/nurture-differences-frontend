import React, { Component } from "react"
import "../App.css"
import { WorldMap } from "react-svg-worldmap"

export default class Map extends Component {


    stylingFunction = (context) => {
        const opacityLevel = 0.1 + (1.5 * (context.countryValue - context.minValue) / (context.maxValue - context.minValue))
        return { fill: context.color, fillOpacity: opacityLevel, stroke: "green", strokeWidth: 1, strokeOpacity: 0.2, cursor: "pointer" }
    }
    tooltipText = (text) => {
        return text
    }

    render() {
        return (

            < div className="App" >
                < div className="Main">
                    <WorldMap
                        color={"green"}
                        tooltipBgColor={"purple"}
                        tooltipTextFunction={this.tooltipText}
                        title="ALLiday Map"
                        valueSuffix="points"
                        size="xl"
                        data={this.props.data}
                        frame={false}
                        styleFunction={this.stylingFunction}
                        onClickFunction={this.props.selectCountry}
                    />
                </div>
            </div>
        )
    };
}
