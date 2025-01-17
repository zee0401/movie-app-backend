import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  image: { type: String },
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
