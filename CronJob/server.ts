/**
* @desc locate const variable defined in the helpers
* */

/**
*import node packages fron the node modules
@packages express, cors 
*/
import express from 'express'
import { fetchDataAndStore, impressionsCounter, register } from './helpers';
import client from 'prom-client'
import { Server } from 'http';
import axios from 'axios'

/**
* express server iniatilization
* @name server
*/
const server = express()
// server.use(express.json())

const port = 4000;

// Function to expose Prometheus metrics at /metrics endpoint
server.get('/metrics', async (req, res) => {
  // Set the response content type for Prometheus scraping
  res.set('Content-Type', register.contentType);

  // Return the Prometheus metrics
  return res.end(await register.metrics());
});



// Function to query Prometheus with PromQL
async function queryPrometheus(query) {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/query`, {
      params: { query: query }
    });
    return response.data;
  } catch (error) {
    console.error('Error querying Prometheus:', error);
    throw new Error('Error querying Prometheus');
  }
}


// Route to fetch metrics using PromQL
server.get('/get-metrics', async (req, res) => {
  console.log("get-metrics");

  let { impressions, date_start, date_stop } = req.query;

  // Check if all query parameters are provided
  if (!impressions || !date_start || !date_stop) {
    return res.status(400).send('Missing required query parameters');
  }

  // Ensure date_start and date_stop are strings
  if (typeof date_start !== 'string' && typeof date_start !== 'number') {
    return res.status(400).send('Invalid date_start value');
  }
  date_start = String(date_start); // Ensure it's a string

  if (typeof date_stop !== 'string' && typeof date_stop !== 'number') {
    return res.status(400).send('Invalid date_stop value');
  }
  date_stop = String(date_stop); // Ensure it's a string

  // Ensure impressions is a number
  if (typeof impressions !== 'string' && typeof impressions !== 'number') {
    return res.status(400).send('Invalid impressions value');
  }


  // PromQL query to get data for impressions within the given date range
  const query = `impressions_total{date_start="${date_start}", date_stop="${date_stop}"}`;

  try {
    // Query Prometheus
    const data = await queryPrometheus(query);

    // Send the result back to the client
    res.json(data);  // Send Prometheus response back to client
  } catch (error) {
    res.status(500).send('Error querying Prometheus');
  }
});

/**
* @const start
* @desc server start point
* */
const startCron = async () => {
  try {
    /**
    * @desc listening port
    * */
    // server.listen(port);
    await fetchDataAndStore()
    server.listen(port, () =>
      console.log(`Server running on port ${port}`)
    )
  } catch (error) {
    /**
    * @desc throw server error if there is any
    * */
    console.log(error)
    process.exit()
  }
}

// Set the interval to run every 5 minutes (300000 ms)
setInterval(fetchDataAndStore, 300000);  //5 minutes

/**
* @desc  start server
* */
startCron()



