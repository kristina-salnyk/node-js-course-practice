import genreInputSchema from "../../schemas/genreInputSchema";
import { genreInput } from "../../__mocks__/genre";

describe("Genre Input Schema", (): void => {
  it("should accept a valid genre input", (): void => {
    const result = genreInputSchema.validate(genreInput);

    expect(result.value).toEqual(genreInput);
    expect(result.error).toBeUndefined();
  });

  it("should return an error if a required field is missing", (): void => {
    const result = genreInputSchema.validate({});

    expect(result.error).toHaveProperty(
      "message",
      "Missing required name field"
    );
  });

  it("should return an error if the 'name' field contains less than 3 characters", (): void => {
    const result = genreInputSchema.validate({ name: "Ac" });

    expect(result.error).toHaveProperty(
      "message",
      '"name" length must be at least 3 characters long'
    );
  });

  it("should return an error if the 'name' field contains more than 30 characters", (): void => {
    const mockGenreInput = {
      name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    };

    const result = genreInputSchema.validate(mockGenreInput);

    expect(result.error).toHaveProperty(
      "message",
      '"name" length must be less than or equal to 30 characters long'
    );
  });

  it("should return an error if the 'name' field is not a string", (): void => {
    const result = genreInputSchema.validate({ name: 123 });

    expect(result.error).toHaveProperty("message", '"name" must be a string');
  });
});
