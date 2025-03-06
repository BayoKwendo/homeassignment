import * as redis from 'redis';
import dotenv from 'dotenv';
dotenv.config(); // iniatilized configs here

const url = `${process.env.REDIS_URL}`;

console.log("redis url ", url)
const client = redis.createClient({ url });


export default client