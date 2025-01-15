import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/connectDb";

import { corsConfig } from "./config/corsConfig";

dotenv.config();
connectDB();

const app = express();

app.use(corsConfig());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello zeshan!");
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
