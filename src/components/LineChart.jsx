import {useState, useEffect} from 'react';
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../common/theme";
import { checkLoginStatus } from "../service/checkLoginStatus";
import { useNavigate } from "react-router-dom";
import { handleRequest, HttpRequest } from '../model/http_request';

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [lineData, setLineData] = useState([]);
    const [yMax, setYMax] = useState(400000);

    let navigate = useNavigate();

    useEffect( () => {
      if (!checkLoginStatus()) {
        navigate("/login");
      }
      getCategoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[navigate])

    const getCategoryData = () => {
      let request = new HttpRequest('Get', `/datasource/category/*`);
      handleRequest(request).then((a) => dataConstruct(a.data)).catch((err) => alert(err));
    }

    const dataConstruct = (datas) => {
      datas.sort((data1, data2) => data1.year - data2.year)
      //setYMax(Math.max(datas.map()))
      const lineData = [];
      for (let key in datas[0]) {
        if (key !== 'id' && key !== 'year') {
          lineData.push({id: key, color: tokens("dark").greenAccent[500], data: []});
        }
      }
      for (let index in datas) {
        let data = datas[index]
        lineData.find(obj => obj.id === 'federal_skilled_worker')?.data.push({
          x: data['year'],
          y: data['federal_skilled_worker'],
        });
        lineData.find(obj => obj.id === 'quebec_skilled_worker')?.data.push({
          x: data['year'],
          y: data['quebec_skilled_worker'],
        });
        lineData.find(obj => obj.id === 'provincial_nominee_program')?.data.push({
          x: data['year'],
          y: data['provincial_nominee_program'],
        });
        lineData.find(obj => obj.id === 'family_sponsorship')?.data.push({
          x: data['year'],
          y: data['family_sponsorship'],
        });
        lineData.find(obj => obj.id === 'business_immigrant')?.data.push({
          x: data['year'],
          y: data['business_immigrant'],
        });
        lineData.find(obj => obj.id === 'total')?.data.push({
          x: data['year'],
          y: data['total'],
        });
        lineData.find(obj => obj.id === 'canadian_experience_class')?.data.push({
          x: data['year'],
          y: data['canadian_experience_class'],
        });
      }
      setLineData(lineData);
    }
  
    return (
      <ResponsiveLine
        data={lineData}
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
          tooltip: {
            container: {
              color: colors.primary[500],
            },
          },
        }}
        colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
        margin={{ top: 50, right: 150, bottom: 50, left: 100 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: 'auto',
          max: 'auto',
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend:  "Year", // added
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Number of Immigrants',
          legendOffset: -70,
          legendPosition: 'middle'
      }}
        enableGridX={false}
        enableGridY={false}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    );
  };
  
  export default LineChart;