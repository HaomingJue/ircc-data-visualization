import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../common/theme";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkLoginStatus } from "../service/checkLoginStatus";
import { handleRequest, HttpRequest } from "../model/http_request";

const PieChart = ({isDashboard=false}) => {
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


  const [provinceData, setProvinceData] = useState([])

  const getImmigrationColumn = () => {
    let request = new HttpRequest('Get', "/datasource/destination/*");
    handleRequest(request).then((data) => constructData(data.data)).catch((err) => alert(err));
  }

  const constructData = (data) => {
    var allLabels = []
    allLabels.push("business_immigrant");
    allLabels.push("canadian_experience_class")
    allLabels.push("family_sponsorship");
    allLabels.push("federal_skilled_worker");
    allLabels.push("provincial_nominee_program")
    allLabels.push("quebec_skilled_worker")

    var provinceData = []

    for (let j = 0; j < allLabels.length; j++) {
      var oneLabel = allLabels[j]
      var count = 0;
      var cell = {}
      for (let i = 0; i < data.length; i++) {
        count = Number(data[i][oneLabel]) + count ;
      }
      cell["label"] = oneLabel;
      cell["id"] = oneLabel;
      cell["value"] = count;
      provinceData.push(cell);
    }


    setProvinceData(provinceData)
  }
  return (
    <ResponsivePie
      data={provinceData}
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
      margin={{ top: 40, right: 80, bottom: isDashboard ? 25 : 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={isDashboard ? false : true}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      isInteractive={true}
      tooltip={function(e) {}}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={isDashboard ? [] : [
        {
          anchor: "bottom-left",
          direction: "column",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 40,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: colors.primary[100],
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;