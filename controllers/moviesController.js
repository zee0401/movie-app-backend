import Movie from "../models/MovieModel.js";

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }
  const movies = await Movie.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ],
  });
  res.json(movies);
});

export const addMovie = asyncHandler(async (req, res) => {
  const { name, description, rating, releaseDate, duration, imageUrl } =
    req.body;

  if (!name || !description || !rating || !releaseDate || !duration) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const movie = new Movie({
    name,
    description,
    rating,
    releaseDate,
    duration,
  });

  try {
    const savedMovie = await movie.save();
    res.json(savedMovie);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
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
