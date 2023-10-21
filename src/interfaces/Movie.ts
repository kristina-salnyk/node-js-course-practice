import Genre from "./Genre";

interface Movie {
  _id: string;
  title: string;
  description: string;
  releaseDate: Date;
  genre: Genre[];
}

export default Movie;
