import { Document } from "mongoose";

interface GenreDocument extends Document {
  name: string;
}

export default GenreDocument;
