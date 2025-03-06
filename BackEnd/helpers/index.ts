/** @package express */
import express from 'express'
import bcrypt from 'bcryptjs'

/**@desc import redis client */
import client from "../db/redis"


//create user
export const createUser = async () => {
   const hash_password = await bcrypt.hash("1234", 10)

   //user mock data
   const data = {
      username: "test",
      password: hash_password
   }

   await client.hSet(
      "login_data",
      `user_details`,
      JSON.stringify(data)
   )
}


// store sample data to redis
const sampleData = {
   "data": [
      {
         "impressions": "1741",
         "date_start": "2016-03-11",
         "date_stop": "2016-03-12"
      }
   ],
   "paging": {
      "cursors": {
         "before": "MAZDZD",
         "after": "MAZDZD"
      }
   }
}

export const createSampleData = async () => {
   await client.hSet(
      "store_data",
      `sample_details`,
      JSON.stringify(sampleData)
   )
}
//response template
export const responseTemplate = (status: boolean, statuscode: number, data: any, message: any) => {
   return {
      Status: status,
      StatusCode: statuscode,
      Data: data,
      StatusMessage: message
   }
}

/**
 * @desc  initiate router object
 * */
export const router = express.Router()
