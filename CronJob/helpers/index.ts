/** @package express */
import express from 'express'

import axios from 'axios'
import client from 'prom-client'



// Create a registry for Prometheus
export const register = new client.Registry();




// Create a Gauge metric for tracking impressions
// const impressionsGauge = new client.Gauge({
//    name: 'impressions_count',
//    help: 'Number of impressions for a given date range',
//    labelNames: ['date_start', 'date_stop'],  // Labels for date range
// });



export const impressionsCounter = new client.Counter({
   name: 'impressions_total',
   help: 'Total number of impressions',
   labelNames: ['date_start', 'date_stop'], // Add labels for the date range
});

// Register the metric with the registry
register.registerMetric(impressionsCounter);

// Function to simulate updating the impressions counter
function updateImpressions(impressions, date_start, date_stop) {
   impressionsCounter.labels(date_start, date_stop).inc(impressions);
}



//create user
export const fetchDataAndStore = async () => {
   try {
      // Replace with your fake API URL
      const response = await axios.get('http://backend-app:8000/api/v1/fake-insights');
      // fetching from  the API returns
      const data = response.data.Data.data[0];  // get data here
      const { impressions, date_start, date_stop } = data;
      // Map data to Prometheus-compatible format
      // Update impressions with some data
      updateImpressions(parseInt(impressions), date_start, date_stop);

      console.log(`Data fetched and stored in Prometheus: ${impressions} impressions from ${date_start} to ${date_stop}`);
   } catch (error) {
      console.error('Error fetching data:', error);
   }
}