import asyncHandler from "../middleware/asyncHandler.js";
import Movie from "../models/MovieModel.js";

export const getAllMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find();

    const sortedMovies = movies.sort((a, b) => b.rating - a.rating);
    res.status(200).json(sortedMovies);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching movies" });
  }
});

export const getSortedMovies = async (req, res) => {
  const { sortBy } = req.query;
  const sortFields = ["name", "rating", "releaseDate", "duration"];
  if (!sortFields.includes(sortBy)) {
    return res.status(400).json({ message: "Invalid sort field" });
  }
  const movies = await Movie.find().sort({ [sortBy]: 1 });
  res.json(movies);
};

export async function getImdbTopMovies(req, res) {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/theapache64/top250/master/top250_min.json"
    );

    const data = await response.json();

    res.json({ success: true, content: data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const searchMovies = asyncHandler(async (req, res) => {
  const { searchTerm } = req.query;

  console.log("Searching for movies with searchTerm:", searchTerm);

  if (!searchTerm) {
    return res
      .status(400)
      .json({ message: "Query parameter 'searchTerm' is required" });
  }

  try {
    const movies = await Movie.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search in title
        { description: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search in description
      ],
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const addMovie = asyncHandler(async (req, res) => {
  const { name, description, rating, releaseDate, duration, imageUrl } =
    req.body;

  if (!name || !description || !rating || !releaseDate || !duration) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const date = new Date(releaseDate);
  const formattedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const movie = new Movie({
    name,
    description,
    rating: parseFloat(rating),
    releaseDate: formattedDate,
    duration: parseInt(duration, 10),
    imageUrl: imageUrl || "",
  });

  try {
    const savedMovie = await movie.save();
    res.json(savedMovie);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export const editMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedMovie = await Movie.findByIdAndUpdate(id, updates, {
    new: true,
  });

  if (!updatedMovie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.json(updatedMovie);
});

export const deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedMovie = await Movie.findByIdAndDelete(id);

  if (!deletedMovie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.json({ message: "Movie deleted successfully" });
});

export const getMovieById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const movie = await Movie.findById(id);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.status(200).json({ message: "Movie found", movie });
});
