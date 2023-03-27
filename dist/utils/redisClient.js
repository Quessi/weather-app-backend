"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const redisPort = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 13125;
const client = (0, redis_1.createClient)({
    password: process.env.REDIS_CONNECTION,
    socket: {
        host: process.env.REDIS_HOST,
        port: redisPort
    }
});
exports.default = client;
