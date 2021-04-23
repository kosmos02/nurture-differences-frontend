import React, { Component } from "react"
import "../App.css"
import { WorldMap } from "react-svg-worldmap"

export default class Map extends Component {


    stylingFunction = (context) => {
        const opacityLevel = 0.5 + (1.5 * (context.countryValue - context.minValue) / (context.maxValue - context.minValue))
        return { fill: context.color, fillOpacity: opacityLevel, stroke: "greenYellow", strokeWidth: 2, strokeOpacity: 0.1, cursor: "pointer" }
    }
    tooltipText = (text) => {
        return text
    }

    render() {
        return (

            // < div className="App" >
            //     < div className="Main">
            <div className="worldMap">
                    <h1>Alliday Map</h1>
                    <WorldMap
                        className="map"
                        color={"green"}
                        backgroundColor
                        tooltipBgColor={"purple"}
                        tooltipTextFunction={this.tooltipText}
                        valueSuffix="points"
                        size="xxl"
                        data={this.props.data}
                        frame={false}
                        styleFunction={this.stylingFunction}
                        onClickFunction={this.props.selectCountry}
                    />
            </div>
            //     </div>
            // </div>
        )
    };
}
