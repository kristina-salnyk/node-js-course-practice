import { Document } from "mongoose";
import GenreDocument from "./GenreDocument";

interface MovieDocument extends Document {
  title: string;
  description: string;
  releaseDate: Date;
  genre: GenreDocument[];
}

export default MovieDocument;
