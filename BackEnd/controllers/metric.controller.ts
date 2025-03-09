import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import logger from '../middlewares/logger'
import client from '../db/redis'
import { responseTemplate } from '../helpers'
import axios from 'axios'

export default {
  /**
   * @name POST
   * @desc controller to login user values in the
   * @name login
   * @function login
   * */
  login: async (req: any, res: any) => {
    logger.info(`/POST login`);
    try {
      const body = req.body; // No need to await here if body is already parsed by middleware

      // Fetch the user data from Redis
      const user = await client.hGetAll("login_data");
      const getUserDetails = user.user_details;

      // If user details exist in Redis, parse and validate the password
      if (getUserDetails && JSON.parse(getUserDetails)) {
        const userDetails = JSON.parse(getUserDetails);

        // Validate the password using bcrypt
        const isPasswordValid = await bcrypt.compare(body.password.toString(), userDetails.password);

        if (!isPasswordValid) {
          return res.status(409).send(
            responseTemplate(false, 1, {}, `Wrong Password`)
          );
        } else {
          // Prepare the payload for JWT
          const mdata = {
            username: userDetails.username,
          };

          // Update the password in Redis (this seems like it might be a log, consider revisiting)
          await client.hSet(userDetails.username, 'login_detail_password', body.password);


          // Sign the JWT with the payload and secret
          const token = jwt.sign(mdata, "process.env.JWT_SECRET as string", {
            expiresIn: "5h",
          });

          // Return the token and the user details in the response
          return res.status(200).send(
            responseTemplate(true, 0, {
              Token: token,
              PayLoad: mdata,
            }, `Success`)
          );
        }
      } else {
        // If no user found in Redis
        return res.status(400).send(
          responseTemplate(false, 1, {}, `User Not Found`)
        );
      }
    } catch (error) {
      // Catch any errors and send a failure response
      return res.status(400).send(
        responseTemplate(false, 1, {}, `${error}`)
      );
    }
  },



  /**
   * @name GET
   * @desc controller to sampe metric data values in the
   * @name insights
   * @function insights
   * */
  insights: async (req: any, res: any) => {
    logger.info(`/GET insights`)
    try {

      const data = await client.hGetAll("store_data")

      const getData = data.sample_details

      return res.status(200).send(
        responseTemplate(true, 0,
          JSON.parse(getData)
          , `Success`))
    } catch (error) {
      /**
        * @return
       * catch error is send out here
      * */
      return res.status(400).send(
        responseTemplate(false, 1, {
        }, `${error}`))
    }
  },


  /**
 * @name GET
 * @desc controller to sampe metric data values in the
 * @name prometheus
 * @function prometheus
 * */
  getDataPrometheus: async (req: any, res: any) => {
    logger.info(`/GET prometheus`)

    const PROMETHEUS_URL = 'http://prometheus:9090';  // Default URL for Prometheus, change if necessary
    const { query } = req.query;  // Get the PromQL query from the frontend
    if (!query) {
      return res.status(400).send('PromQL query is required');
    }
    try {
      // Query Prometheus via its API
      const response = await axios.get(`${PROMETHEUS_URL}/api/v1/query`, {
        params: { query }  // Pass the query as a parameter to Prometheus
      });
      // Send the result back to the frontend
      return res.json(response.data);
    } catch (error) {
      console.error('Error querying Prometheus:', error);
      return res.status(500).send('Error querying Prometheus');
    }

  },
}

