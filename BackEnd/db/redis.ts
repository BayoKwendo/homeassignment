import * as redis from 'redis';
import dotenv from 'dotenv';
dotenv.config(); // iniatilized configs here

const url = `redis://assign_redis:6379`;


console.log("redis url ", url)
const client = redis.createClient({ url });


export default client