// src/components/TimeSeriesChart.js
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const TimeSeriesChart = ({ data }) => {
  const series = [{
    name: 'Number of Visitors',
    data: data,
  }];

  const options = {
    chart: { type: 'line', zoom: { enabled: true } },
    xaxis: { type: 'datetime' },
  };

  return <ReactApexChart options={options} series={series} type="line" height={350} />;
};

export default TimeSeriesChart;
