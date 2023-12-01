import GenreDocument from "../documents/GenreDocument";
import Genre from "../models/Genre";

export const genreId = "652f0744373e017388151858";

export const genreInput = {
  name: "Action"
};

export const genreDocument: GenreDocument = new Genre({
  _id: genreId,
  name: genreInput.name
});

export const invalidGenreInput = {
  name: "1"
};
