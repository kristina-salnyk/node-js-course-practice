import { MovieDocument } from "../types";
import MovieInput from "../interfaces/MovieInput";
import Movie from "../models/Movie";
import Genre from "../models/Genre";

export const getMovies = async (): Promise<MovieDocument[]> => {
  return Movie.find().populate("genre", { _id: 1, name: 1 }, Genre);
};

export const getMovieById = async (
  id: string
): Promise<MovieDocument | null> => {
  return Movie.findOne({ _id: id }).populate(
    "genre",
    { _id: 1, name: 1 },
    Genre
  );
};

export const removeMovie = async (id: string): Promise<void | null> => {
  return Movie.findOneAndRemove({ _id: id });
};

export const createMovie = async (
  data: MovieInput
): Promise<MovieDocument | null> => {
  const movie = await Movie.create(data);
  return getMovieById(movie._id);
};

export const updateMovie = async (
  id: string,
  data: MovieInput
): Promise<MovieDocument | null> => {
  return Movie.findOneAndUpdate({ _id: id }, data, {
    new: true,
    runValidators: true
  }).populate("genre", { _id: 1, name: 1 }, Genre);
};
