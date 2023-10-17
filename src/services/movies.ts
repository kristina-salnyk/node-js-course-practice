import fs from "fs/promises";
import path from "path";
import generateUniqueId from "generate-unique-id";

import Movie from "../interfaces/Movie";
import MovieInput from "../interfaces/MovieInput";

const moviesPath = path.resolve(__dirname, "../db/movies-data.json");

const writeMovies = async (movies: Movie[]): Promise<void> => {
  await fs.writeFile(moviesPath, JSON.stringify(movies), "utf-8");
};

const readMovies = async (): Promise<Movie[]> => {
  const data = await fs.readFile(moviesPath, "utf-8");
  return JSON.parse(data);
};

export const getMovies = async (): Promise<Movie[]> => {
  return readMovies();
};

export const getMovieById = async (
  movieId: string
): Promise<Movie | undefined> => {
  const movies = await readMovies();
  return movies.find((item: Movie): boolean => item.id === movieId);
};

export const removeMovie = async (movieId: string): Promise<void> => {
  const movies = await readMovies();
  const filteredMovies = movies.filter(
    (item: Movie): boolean => item.id !== movieId
  );
  await writeMovies(filteredMovies);
};

export const addMovie = async (data: MovieInput): Promise<Movie> => {
  const { title, description, genre, duration } = data;
  const movies = await readMovies();

  const movie: Movie = {
    id: generateUniqueId(),
    title,
    description,
    genre,
    duration
  };
  movies.push(movie);

  await writeMovies(movies);
  return movie;
};

export const updateMovie = async (
  movieId: string,
  data: MovieInput
): Promise<Movie | undefined> => {
  const { title, description, genre, duration } = data;
  const movies = await readMovies();

  const movie = movies.find((item: Movie): boolean => item.id === movieId);

  if (movie) {
    movie.title = title;
    movie.description = description;
    movie.genre = genre;
    movie.duration = duration;

    await writeMovies(movies);
  }

  return movie;
};
