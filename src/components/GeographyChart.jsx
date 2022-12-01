import { Box, useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from "../mockData/mockGeoFeatures";
import { tokens } from "../common/theme";
import { BasicTooltip } from '@nivo/tooltip';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkLoginStatus } from "../service/checkLoginStatus";
import { handleRequest, HttpRequest } from "../model/http_request";
import { countryCode } from "../model/countryCode";

const GeographyChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let navigate = useNavigate()

  useEffect( () => {
    if (!checkLoginStatus()) {
      navigate("/login");
    }
    getCountryData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[navigate])


  const [countryData, setCountryData] = useState([])

  const getCountryData = () => {
    let request = new HttpRequest('Get', "/datasource/country/*");
    handleRequest(request).then((data) => constructData(data.data)).catch((err) => alert(err));
  }

  const constructData = (data) => {
    var countryDataList = []

    for (var i = 0; i < data.length; i++) {
      var pair = {}
      pair["id"] = countryCode[data[i]["name"]]
      pair["value"] = data[i]["total"];
      countryDataList.push(pair)
    }
    setCountryData(countryDataList)
  }
  
  return (
    <ResponsiveChoropleth
      data={countryData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      features={geoFeatures.features}
      margin={isDashboard? { top: 50, right: 0, bottom: 0, left: 0 } : { top: 80, right: 0, bottom: 0, left: 0 }}
      domain={[0, 70000]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionScale={isDashboard ? 80 : 250}
      projectionTranslation={isDashboard ? [0.49, 0.6] : [0.45, 0.5]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1.5}
      borderColor="#ffffff"
      tooltip={(props) => {
        return (
          <Box color={"#040509"}>
            <BasicTooltip
                id={props.feature.id}
                value={props.feature.formattedValue}
                color={props.feature.color}
                enableChip
                style= {{color: "#6699ff"}}
            />
          </Box>
        );}}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: colors.grey[100],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#ffffff",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default GeographyChart;