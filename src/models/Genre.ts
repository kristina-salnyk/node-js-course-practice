import mongoose from "mongoose";
import IGenre from "../interfaces/Genre";

const Schema = mongoose.Schema;

const genre = new Schema<IGenre>(
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

const Genre = mongoose.model("genre", genre);

export default Genre;
