import { HydratedDocument } from "mongoose";
import Genre from "../interfaces/Genre";
import Movie from "../interfaces/Movie";

export type GenreDocument = HydratedDocument<Genre>;

export type MovieDocument = HydratedDocument<Movie>;
