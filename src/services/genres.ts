import fs from "fs/promises";
import path from "path";
import Genre from "../interfaces/Genre";

const genresPath = path.resolve(__dirname, "../db/genres-data.json");

const readGenres = async (): Promise<Genre[]> => {
  const data = await fs.readFile(genresPath, "utf-8");
  return JSON.parse(data);
};

export const getGenres = async (): Promise<Genre[]> => {
  return readGenres();
};

export const getGenreById = async (
  genreId: string
): Promise<Genre | undefined> => {
  const genres = await readGenres();
  return genres.find((item: Genre): boolean => item.id === genreId);
};
