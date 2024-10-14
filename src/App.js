// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import DateRangePicker from './components/DateRangePicker';
import TimeSeriesChart from './components/TimeSeriesChart';
import ColumnChart from './components/ColumnChart';
import SparklineChart from './components/SparklineChart';
import Papa from 'papaparse';

const App = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [hotelBookings, setHotelBookings] = useState([]);

  // Load CSV data on component mount
  useEffect(() => {
    Papa.parse('/hotel_bookings_1000.csv', {
      download: true,
      header: true,
      complete: (results) => {
        setHotelBookings(results.data);
        setFilteredData(results.data); // Initialize filtered data
      },
      error: (error) => {
        console.error("Error reading CSV file:", error);
      },
    });
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = hotelBookings.filter(booking => {
        const bookingDate = new Date(
          booking.arrival_date_year,
          new Date(`${booking.arrival_date_month} 1, 2023`).getMonth(),
          booking.arrival_date_day_of_month
        );
        return bookingDate >= startDate && bookingDate <= endDate;
      });
      setFilteredData(filtered);
    }
  }, [startDate, endDate, hotelBookings]); // Add hotelBookings to dependencies

  const timeSeriesData = filteredData.map(booking => ({
    x: `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`,
    y: Number(booking.adults) + Number(booking.children) + Number(booking.babies), // Convert to numbers
  }));

  const columnChartData = Array.from(
    filteredData.reduce((map, booking) => {
      map.set(booking.country, (map.get(booking.country) || 0) + (Number(booking.adults) + Number(booking.children) + Number(booking.babies)));
      return map;
    }, new Map())
  ).map(([x, y]) => ({ x, y }));

  const adultVisitorsData = filteredData.map(booking => Number(booking.adults));
  const childrenVisitorsData = filteredData.map(booking => Number(booking.children));

  return (
    <div className="App">
      <h1>Hotel Booking Dashboard</h1>
      <DateRangePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
      <TimeSeriesChart data={timeSeriesData} />
      <ColumnChart data={columnChartData} />
      <SparklineChart label="Total Adult Visitors" data={adultVisitorsData} />
      <SparklineChart label="Total Children Visitors" data={childrenVisitorsData} />
    </div>
  );
};

export default App;
