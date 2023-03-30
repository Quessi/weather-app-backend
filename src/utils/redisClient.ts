import { createClient } from 'redis';

const redisPort  = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 13125 
const client = createClient({
    password: process.env.REDIS_CONNECTION,
    socket: {
        host: process.env.REDIS_HOST,
        port: redisPort
    }
});

export default client