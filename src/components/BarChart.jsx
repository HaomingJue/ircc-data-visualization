import { Box, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../common/theme";
import { handleRequest, HttpRequest } from "../model/http_request";
import { checkLoginStatus } from "../service/checkLoginStatus";
import { BasicTooltip } from '@nivo/tooltip';
import Suspense from "./LoadingSkeleton";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let navigate = useNavigate()

  useEffect( () => {
    if (!checkLoginStatus()) {
      navigate("/login");
    }
    getImmigrationColumn();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[navigate])

  const [destData, setDestData] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const getImmigrationColumn = () => {
    let request = new HttpRequest('Get', "/datasource/destination/*");
    setLoading(true);
    handleRequest(request).then((data) => constructData(data.data)).catch((err) => {setLoading(false); alert(err); setError(err)});
  }

  const constructData = (data) => {
    setDestData(data)
    var allRows = []
    for (var i = 0; i < data.length; i++) {
      allRows.push(data[i]);
    }
    allRows.sort(function(a, b) {
      return b['total'] - a['total']
    })
    setDestData(allRows)
    setLoading(false);
  }


  return (
    <Suspense
      loading={loading}
      data={destData}
      error={error}
      onRetry={() => getImmigrationColumn}
      type={'chart'}
    >
      
      <ResponsiveBar
        data={destData}
        theme={{
          // added
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
        keys={["business_immigrant",
            "canadian_experience_class",
              "family_sponsorship", 
              "province_nominee_program", 
              "quebec_skilled_worker",
              "federal_skilled_worker"]}
        indexBy="province"
        margin={{ top: 50, right: 200, bottom: 50, left: 110 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        tooltip={(props) => {
          return (
            <Box color={"#040509"}>
              <BasicTooltip
                  id={props.id}
                  value={props.formattedValue}
                  color={props.color}
                  enableChip
              />
            </Box>
          );}}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", "1.6"]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "country", // changed
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "food", // changed
          legendPosition: "middle",
          legendOffset: -80,
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        barAriaLabel={function (e) {
          return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
        }}
      />
    </Suspense>  
  );
};

export default BarChart;