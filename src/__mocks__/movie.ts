import MovieDocument from "../documents/MovieDocument";
import Movie from "../models/Movie";
import { genreDocument, genreId } from "./genre";

export const movieId = "652f0744373e017388151857";

export const movieInput = {
  title: "The Matrix",
  description: "The true nature of reality.",
  releaseDate: new Date("2023-03-31T00:00:00.000Z"),
  genre: [genreId]
};

export const movieDocument: MovieDocument = new Movie({
  _id: movieId,
  title: movieInput.title,
  description: movieInput.description,
  releaseDate: movieInput.releaseDate,
  genre: [genreDocument]
});
