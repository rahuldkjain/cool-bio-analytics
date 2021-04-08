import PropTypes from "prop-types";
import React from "react";
import { geoPatterson } from "d3-geo-projection";
import { useColor } from "@xstyled/styled-components";
import {
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import { useAtom } from "jotai";

import world from "../assets/world.json";
import { selectedCountry } from "../atoms";

const highligts = ["USA", "TUR", "JAM", "IND"]

const width = 800;
const height = 600;

const projection = geoPatterson().translate([width / 2, height / 2]).scale(120);

function getBackGround(statistic) {
    switch (statistic) {
        case "users":
            return 'cherry';
        case "active":
            return 'blue';
        case "sessions":
            return 'green';
        case "bounce":
            return 'gray';
        default:
            return '';
    }
}


function Map({ mapStatistic }) {
    const currentStatistic = getBackGround(mapStatistic);
    const color = useColor(currentStatistic);
    const [selected, setSelectedCountry] = useAtom(selectedCountry);
    const handleGeographyClick = (geography) => event => {
        setSelectedCountry({
            id: geography.id,
            name: geography.properties.name
        })
    };
    return (
        <ComposableMap projection={projection}>
            <Geographies geography={world}>
                {({ geographies }) =>
                    geographies.map(geo =>
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onClick={handleGeographyClick(geo)}
                            style={{
                                default: {
                                    fill: highligts.includes(geo.id) ? color : `${color}10`,
                                    stroke: geo.id === selected.id ? color : `${color}50`,
                                    strokeWidth: 2,
                                    outline: "none"
                                },
                                hover: {
                                    fill: `${color}50`,
                                    stroke: color,
                                    strokeWidth: 0.75,
                                    outline: "none"
                                },
                                pressed: {
                                    fill: "#FF5722",
                                    stroke: "#607D8B",
                                    strokeWidth: 0.75,
                                    outline: "none"
                                }
                            }}
                        />
                    )
                }
            </Geographies>
        </ComposableMap>
    )
}

Map.propTypes = {
    mapStatistic: PropTypes.string
}

export default Map;
