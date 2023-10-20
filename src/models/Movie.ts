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
      maxlength: 100
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

// movie.pre("save", async (next: NextFunction): Promise<void> => {
//   // const genreIds = this.genre.map(String);
//   // const genresExist = await mongoose
//   //   .model("Genre")
//   //   .countDocuments({ _id: { $in: genreIds } });
//   //
//   // if (genreIds.length !== genresExist) {
//   //   const invalidGenreIds = genreIds.filter((id) => !genresExist.includes(id));
//   //   return next(
//   //     new Error(`Жанры с ID ${invalidGenreIds.join(", ")} не существуют`)
//   //   );
//   // }
//
//   next();
// });

const Movie = mongoose.model("movie", movie);

export default Movie;
