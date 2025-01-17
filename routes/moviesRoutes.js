import express from "express";
import {
  getSortedMovies,
  getImdbTopMovies,
} from "../controllers/moviesController.js";
import { getAllMovies } from "../controllers/moviesController.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.get("/all-movies", getAllMovies);
router.get("/sorted", asyncHandler(getSortedMovies));
router.get("/sorted", getImdbTopMovies);
router.get("/search", getSortedMovies);

export default router;
