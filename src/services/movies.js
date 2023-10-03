const fs = require('fs/promises');
const path = require('path');
const generateUniqueId = require('generate-unique-id');

const moviesPath = path.resolve(__dirname, '../db/movies-data.json');

const writeMovies = async (movies) => {
  await fs.writeFile(moviesPath, JSON.stringify(movies), 'utf-8');
};

const readMovies = async () => {
  const data = await fs.readFile(moviesPath, 'utf-8');
  return JSON.parse(data);
};

const getMovies = async () => {
  return readMovies();
};

const getMovieById = async (movieId) => {
  const movies = await readMovies();
  return movies.find((item) => item.id === movieId);
};

const removeMovie = async (movieId) => {
  const movies = await readMovies();
  const movie = movies.filter((item) => item.id !== movieId);
  await writeMovies(movie);
};

const addMovie = async (data) => {
  const {title, description, genre, duration} = data;
  const movies = await readMovies();

  const movie = {id: generateUniqueId(), title, description, genre, duration};
  movies.push(movie);

  await writeMovies(movies);
  return movie;
};

const updateMovie = async (movieId, data) => {
  const {title, description, genre, duration} = data;
  const movies = await readMovies();

  const movie = movies.find((item) => item.id === movieId);
  movie.title = title;
  movie.description = description;
  movie.genre = genre;
  movie.duration = duration;

  await writeMovies(movies);
  return movie;
};

module.exports = {
  getMovies,
  getMovieById,
  removeMovie,
  addMovie,
  updateMovie,
};
