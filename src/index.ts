import "dotenv/config";
import express from "express";
import controllers from "./controllers"
import redisClient from "./utils/redisClient";
const app = express();
const PORT = process.env.PORT || 4000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


(async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected successfully")
  } catch (error) {
    console.log("Redis connection failed")
  }
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(controllers)


app.listen(PORT, () => {
  console.log("server is running", PORT);
});
