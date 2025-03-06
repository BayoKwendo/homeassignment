/**
* @desc locate const variable defined in the helpers
* */
import { createSampleData, createUser, responseTemplate } from './helpers'

/**
*import node packages fron the node modules
@packages express, cors 
*/
import express from 'express'
import cors from 'cors'
import fs from 'fs';
/**
* @desc  looger middleware  */
import logger from './middlewares/logger'

/**
* @desc not found response */
import notFound from './middlewares/notFound'
/**
*
* @desc not found response

/**
* @desc path to routes */
import metricRoute from './routes/metric.route'


/**
*get variables from the .env configs
@package dotenv */
import dotenv from 'dotenv'
import client from './db/redis'
import path from 'path'
const logFilePath = './traffic_logs.log';

dotenv.config({ path: '.env' }) // iniatilized configs here
/**
* express server iniatilization
* @name server
*/
const server = express()
server.use(cors())
// server.use(express.json())
server.use(express.json({ limit: '1000mb' }))
server.use(express.urlencoded({ limit: '1000mb', extended: true }))


/**
* ports and server start
* @const port, start
* */
const port = 8000

/** 
* @const 
*  @type string routes
@default
 
/**@api iniatilize api version to be used in routers */
const api_version = '/api/v1'
server.use("/image", express.static(path.join(__dirname, "image")));

server.use(api_version, metricRoute) // user profile  router

/**
* @desc we healthcheck our server to see if its online or not
* */
server.get(api_version, async (req, res) => {
  logger.info(`/GET check server `)
  try {
    /**
    * @return  server seems to be running well
    * */
    res.status(200).send('API GateWay')
  } catch (error) {
    /**
    * @return  catch the error here
    * */
    res.status(400).send(
      responseTemplate(false, 1, {
      }, `${error}`))
  }
})

/**
* @desc 409 page wrong endpoint when called
* */
server.use(notFound)

/**
* @const start
* @desc server start point
* */
const start = async () => {
  try {
    await client
      .connect()
      .then(async () => {
        console.log('Redis connected')
        // create mock user and store details in redis
        await createUser()

        await createSampleData()
      })
      .catch((err: any) => {
        /**
        * @desc not connected!
        * */
        logger.error('Redis Connection Failed ', err)
        process.exit()
      })

    /**
    @desc  port which the server is running on 
    */
    logger.info(`Server listening on port ${port}....`)

    /**
    * @desc listening port
    * */
    // server.listen(port);
    server.listen(port, () =>
      console.log(`Server running on port ${port}`)
    )
  } catch (error) {
    /**
    * @desc throw server error if there is any
    * */
    logger.error(error)
    process.exit()
  }
}

/**
* @desc  start server
* */
start()



