import express from "express";
import {
  addMovie,
  editMovie,
  deleteMovie,
  getMovieById,
  searchMovies,
} from "../controllers/moviesController.js";

import { getAllMovies } from "../controllers/moviesController.js";

const router = express.Router();

router.get("/all-movies", getAllMovies);
router.get("/single-movie/:id", getMovieById);
router.get("/search", searchMovies);
router.post("/add-movie", addMovie);
router.put("/update-movie/:id", editMovie);
router.delete("/delete-movie/:id", deleteMovie);

export default router;
