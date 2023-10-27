import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import app from "./app";

dotenv.config();

mongoose.set("strictQuery", true);
mongoose.Promise = global.Promise;

const PORT = 3000;
const HOST_URI = process.env.HOST_URI || "";

const connection = mongoose.connect(HOST_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as ConnectOptions);

connection
  .then((): void => {
    app.listen(PORT, (): void => {
      console.log(
        `Database connection successful. Server running on port: ${PORT}`
      );
    });
  })
  .catch((error): void => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
