import app from "./app";

const PORT = 3000;

app.listen(PORT, (): void => {
  console.log(`App listening on port: ${PORT}`);
});
