import GenreDocument from "../documents/GenreDocument";
import GenreInput from "../inputs/GenreInput";
import Genre from "../models/Genre";

export const getGenres = async (): Promise<GenreDocument[]> => {
  return Genre.find();
};

export const getGenreById = async (
  id: string
): Promise<GenreDocument | null> => {
  return Genre.findOne({ _id: id });
};

export const removeGenre = async (id: string): Promise<void | null> => {
  return Genre.findOneAndRemove({ _id: id });
};

export const createGenre = async (data: GenreInput): Promise<GenreDocument> => {
  return Genre.create(data);
};

export const updateGenre = async (
  id: string,
  data: GenreInput
): Promise<GenreDocument | null> => {
  return Genre.findOneAndUpdate({ _id: id }, data, {
    new: true,
    runValidators: true
  });
};

export const countGenres = async (ids: string[]): Promise<number> => {
  return Genre.countDocuments({ _id: { $in: ids } });
};
