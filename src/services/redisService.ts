import redisClient from "../utils/redisClient";

class AppRedisService {
  client: any;

  constructor(client: any) {
    this.client = client;
  }

  async get(key: string) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (error) {
      return null;
    }
  }

  async set(key: string, value: string) {
    try {
      return await this.client.set(key, value);
    } catch (error) {
      return null;
    }
  }

  async expire(key: string, seconds: number) {
    try {
      return this.client.expire(key, seconds);
    } catch (error) {
      return null;
    }
  }
}

const redisService = new AppRedisService(redisClient);

export default redisService
