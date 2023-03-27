import "dotenv/config";
import express from "express";
import controllers from "./controllers"
import redisClient from "./utils/redisClient";
const app = express();
const PORT = process.env.PORT || 4000;


(async () => {
    await redisClient.connect();
    console.log("Redis connected successfully")
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(controllers)


app.listen(PORT, () => {
  console.log("server is running", PORT);
});
