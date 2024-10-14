// src/components/SparklineChart.js
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const SparklineChart = ({ data, label }) => {
  const series = [{ name: label, data: data }];

  const options = {
    chart: { type: 'line', sparkline: { enabled: true } },
    stroke: { curve: 'smooth' },
  };

  return (
    <div>
      <h4>{label}</h4>
      <ReactApexChart options={options} series={series} type="line" height={100} />
    </div>
  );
};

export default SparklineChart;
