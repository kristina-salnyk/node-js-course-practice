import movieInputSchema from "../../schemas/movieInputSchema";
import { movieInput } from "../../__mocks__/movie";
import { genreId } from "../../__mocks__/genre";

describe("Movie Input Schema", (): void => {
  it("should accept a valid movie input", (): void => {
    const result = movieInputSchema.validate(movieInput);

    expect(result.value).toEqual(movieInput);
    expect(result.error).toBeUndefined();
  });

  it("should return an error if the 'title' field is not a string", (): void => {
    const mockMovieInput = { ...movieInput, title: 123 };

    const result = movieInputSchema.validate(mockMovieInput);

    expect(result.error).toHaveProperty("message", '"title" must be a string');
  });

  it("should return an error if a required field is missing", (): void => {
    const mockMovieInput = {
      description: movieInput.description,
      releaseDate: movieInput.releaseDate,
      genre: movieInput.genre
    };

    const result = movieInputSchema.validate(mockMovieInput);

    expect(result.error).toHaveProperty(
      "message",
      "Missing required title field"
    );
  });

  it("should return an error if the 'title' field contains less than 3 characters", (): void => {
    const mockMovieInput = { ...movieInput, title: "Ma" };

    const result = movieInputSchema.validate(mockMovieInput);

    expect(result.error).toHaveProperty(
      "message",
      '"title" length must be at least 3 characters long'
    );
  });

  it("should return an error if the 'title' field contains more than 30 characters", (): void => {
    const mockMovieInput = {
      ...movieInput,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    };

    const result = movieInputSchema.validate(mockMovieInput);

    expect(result.error).toHaveProperty(
      "message",
      '"title" length must be less than or equal to 30 characters long'
    );
  });

  it("should return an error if the 'releaseDate' field is not a date", (): void => {
    const mockMovieInput = { ...movieInput, releaseDate: "Release date" };

    const result = movieInputSchema.validate(mockMovieInput);

    expect(result.error).toHaveProperty(
      "message",
      '"releaseDate" must be a valid date'
    );
  });

  it("should return an error if the 'genre' field is not an array", (): void => {
    const mockMovieInput = { ...movieInput, genre: genreId };

    const result = movieInputSchema.validate(mockMovieInput);

    expect(result.error).toHaveProperty("message", '"genre" must be an array');
  });

  it("should return an error if the 'genre' field contains an invalid genre id", (): void => {
    const mockMovieInput = { ...movieInput, genre: ["123"] };

    const result = movieInputSchema.validate(mockMovieInput);

    expect(result.error).toHaveProperty(
      "message",
      '"genre[0]" with value "123" fails to match the required pattern: /^[0-9a-fA-F]{24}$/'
    );
  });
});
