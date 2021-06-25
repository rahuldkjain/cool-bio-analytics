import PropTypes from "prop-types";
import React from "react";
import { geoPatterson } from "d3-geo-projection";
import { useColor } from "@xstyled/styled-components";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useAtom } from "jotai";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";

import {
  GET_SESSIONS_COUNT_WITH_COUNTRY,
  GET_SESSIONS_USERS_COUNT_WITH_COUNTRY,
  GET_SESSIONS_WITH_COUNTRY,
  GET_SESSIONS_BOUNCE_COUNT_WITH_COUNTRY,
} from "../graphql/queries";

import world from "../assets/world.json";
import { selectedCountry } from "../atoms";

const width = 800;
const height = 600;

const projection = geoPatterson()
  .translate([width / 2, height / 2])
  .scale(120);

function getBackGround(statistic) {
  switch (statistic) {
    case "users":
      return "cherry";
    case "active":
      return "blue";
    case "sessions":
      return "green";
    case "bounce":
      return "gray";
    default:
      return "";
  }
}

const queries = {
  users: GET_SESSIONS_USERS_COUNT_WITH_COUNTRY,
  sessions: GET_SESSIONS_COUNT_WITH_COUNTRY,
  active: GET_SESSIONS_WITH_COUNTRY,
  bounce: GET_SESSIONS_BOUNCE_COUNT_WITH_COUNTRY,
};

const updatedAt = dayjs().subtract(1, "minutes");

function Map({ mapStatistic, projectId }) {
  const currentStatistic = getBackGround(mapStatistic);
  const color = useColor(currentStatistic);
  const dateFor = dayjs().subtract(0, "day").format("YYYY-MM-DD");
  const [selected, setSelectedCountry] = useAtom(selectedCountry);
  const {
    loading,
    error,
    data = {},
  } = useQuery(queries[mapStatistic], {
    variables: {
      projectId,
      at: {
        _gte: mapStatistic === "active" ? updatedAt : dateFor,
      },
    },
  });
  const { table = [] } = data;
  const highligts = table.map((item) => item.country);
  const handleGeographyClick = (geography) => (event) => {
    const currentSelectedData = table.find(
      (item) => item.country === geography.properties["Alpha-2"]
    );
    setSelectedCountry({
      id: currentSelectedData.country,
      name: geography.properties.name,
      count: currentSelectedData.count,
    });
  };

  return (
    <ComposableMap projection={projection}>
      <Geographies geography={world}>
        {({ geographies }) =>
          geographies.map((geo) => {
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={handleGeographyClick(geo)}
                style={{
                  default: {
                    fill: highligts.includes(geo.properties["Alpha-2"])
                      ? color
                      : `${color}10`,
                    stroke: highligts.includes(geo.properties["Alpha-2"])
                      ? color
                      : `${color}50`,
                    strokeWidth: 2,
                    outline: "none",
                  },
                  hover: {
                    fill: `${color}50`,
                    stroke: color,
                    strokeWidth: 0.75,
                    outline: "none",
                  },
                  pressed: {
                    fill: `${color}50`,
                    stroke: color,
                    strokeWidth: 0.75,
                    outline: "none",
                  },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}

Map.propTypes = {
  mapStatistic: PropTypes.string,
  projectId: PropTypes.string,
};

export default Map;
