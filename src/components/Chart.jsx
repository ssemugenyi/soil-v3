/* eslint-disable import/no-extraneous-dependencies */
import React from "react";

import Chart from "react-apexcharts";

const AreaChart = ({ type, nitrogen, phosphorus, potassium, date }) => {
  const options = {
    chart: { height: 150 },
    noData: { text: "No data" },
    xaxis: {
      categories: date,
    },
    bar: {
      borderRadius: 10,
      borderRadiusApplication: "around",
      borderRadiusWhenStacked: "last",
    },
  };
  const series = [
    {
      name: "Nitrogen",
      data: nitrogen,
    },
    {
      name: "Potassium",
      data: phosphorus,
    },
    {
      name: "Phosphorus",
      data: potassium,
    },
  ];

  return <Chart options={options} series={series} type={type} height={250} />;
};
export default AreaChart;
