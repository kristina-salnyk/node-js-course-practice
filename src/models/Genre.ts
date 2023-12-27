import mongoose from "mongoose";
import GenreDocument from "../documents/GenreDocument";

const Schema = mongoose.Schema;

const genre = new Schema<GenreDocument>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
      unique: true
    }
  },
  { versionKey: false, timestamps: true }
);

const Genre = mongoose.model<GenreDocument>("genre", genre);

export default Genre;
