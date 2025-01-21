import express from "express";
import {
  getSortedMovies,
  getImdbTopMovies,
  addMovie,
  editMovie,
} from "../controllers/moviesController.js";
import { getAllMovies } from "../controllers/moviesController.js";
import asyncHandler from "../middleware/asyncHandler.js";
const router = express.Router();

router.get("/all-movies", getAllMovies);
router.get("/sorted", asyncHandler(getSortedMovies));
router.get("/sorted", getImdbTopMovies);
router.get("/search", getSortedMovies);
router.post("/create-movie", addMovie);
router.put("/edit-movie", editMovie);

export default router;
