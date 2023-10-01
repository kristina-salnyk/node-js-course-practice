const fs = require('fs/promises');
const path = require('path');

const genresPath = path.resolve(__dirname, '../db/genres-data.json');

const readGenres = async () => {
  const data = await fs.readFile(genresPath, 'utf-8');
  return JSON.parse(data);
};

const getGenres = async () => {
  return readGenres();
};

const getGenreById = async (genreId) => {
  const genres = await readGenres();
  return genres.find((item) => item.id === genreId);
};

module.exports = {
  getGenres,
  getGenreById,
};
