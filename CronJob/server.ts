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



