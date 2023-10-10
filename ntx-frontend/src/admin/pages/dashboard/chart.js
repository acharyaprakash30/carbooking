import React, { useState } from "react";
import Chart from "react-apexcharts";

export const GraphChart = (props) => {
  const { xData, yData } = props;
  let index = -1;
  const [position, setPostion] = useState("1");

  const options = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false,
      },
      foreColor: "#9e9e9e",
      fill: {
        colors: ["red"],
      },
      events: {
        mouseMove: function (event, chartContext, config) {
          if (
            config["seriesIndex"] === 0 &&
            index !== config["dataPointIndex"]
          ) {
            setPostion(config["dataPointIndex"]);
          }
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: xData || [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        style: {
          colors: [],
          fontSize: "20px",
          fontFamily: "Inter",
          fontWeight: 500,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    colors: ["#4F4CD1", "#4F4CD1", "#4F4CD1", "#4F4CD1", "#4F4CD1"],
    stroke: {
      show: true,
      width: 2,
    },
    markers: {
      shape: "circle",
      hover: {
        size: undefined,
        sizeOffset: 4,
      },
    },
    grid: {
      show: false,
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
  };

  const series = [
    {
      name: "Total",
      data: yData || [],
    },
  ];
  return (
    <Chart
      options={options}
      series={series}
      type="line"
      height={200}
      width="100%"
    />
  );
};
