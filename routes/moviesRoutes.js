import express from "express";
import {
  addMovie,
  editMovie,
  deleteMovie,
  getMovieById,
  searchMovies,
} from "../controllers/moviesController.js";
import { getAllMovies } from "../controllers/moviesController.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.get("/all-movies", getAllMovies);
router.get("/singleMovie/:id", getMovieById);
router.get("/search", searchMovies);
router.post("/create-movie", addMovie);
router.put("/edit-movie", editMovie);
router.delete("/delete-movie", deleteMovie);

export default router;
