import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/connectDb.js";

import moviesRoutes from "./routes/moviesRoutes.js";
import { getSortedMovies } from "./controllers/moviesController.js";
import adminRoutes from "./routes/adminRoutes.js";
import { corsConfig } from "./config/corsConfig.js";
// import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(corsConfig());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(cookieParser());

const PORT = process.env.PORT;

app.use("/movies", moviesRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
