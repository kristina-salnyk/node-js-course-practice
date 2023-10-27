import mongoose from "mongoose";
import IMovie from "../interfaces/Movie";

const Schema = mongoose.Schema;

const movie = new Schema<IMovie>(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1000
    },
    releaseDate: {
      type: Date,
      required: true
    },
    genre: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
        required: true
      }
    ]
  },
  { versionKey: false, timestamps: true }
);

movie.index({ title: 1, releaseDate: 1 }, { unique: true });

const Movie = mongoose.model("movie", movie);

export default Movie;
