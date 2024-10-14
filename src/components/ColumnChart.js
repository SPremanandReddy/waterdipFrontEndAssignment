// src/components/ColumnChart.js
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ColumnChart = ({ data }) => {
  const series = [{ name: 'Visitors', data: data }];
  
  const options = {
    chart: { type: 'bar' },
    plotOptions: { bar: { horizontal: false, dataLabels: { position: 'top' } } },
    xaxis: { categories: data.map(d => d.x) },
  };

  return <ReactApexChart options={options} series={series} type="bar" height={350} />;
};

export default ColumnChart;
