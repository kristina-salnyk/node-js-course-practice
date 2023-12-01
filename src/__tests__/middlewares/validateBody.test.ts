import { getMockReq, getMockRes } from "@jest-mock/express";
import { genreInput, invalidGenreInput } from "../../__mocks__/genre";
import genreInputSchema from "../../schemas/genreInputSchema";
import validateBody from "../../middlewares/validateBody";
import ApiError from "../../errors/ApiError";

describe("Validate Body Middleware", (): void => {
  afterEach((): void => {
    jest.clearAllMocks();
  });

  test("should accept request if request body is valid", async (): Promise<void> => {
    const req = getMockReq({ body: genreInput });
    const { res, next } = getMockRes();

    // jest.spyOn(genreInputSchema, "validate");
    (genreInputSchema.validate as jest.Mock).mockReturnValue({ error: null });

    const middleware = validateBody(genreInputSchema);
    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });

  test("should respond with an error if request body is empty", async (): Promise<void> => {
    const req = getMockReq({ body: {} });
    const { res, next } = getMockRes();

    const middleware = validateBody(genreInputSchema);
    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(new ApiError("Invalid input", 400));
  });

  test("should respond with an error if request body is not valid", async (): Promise<void> => {
    const req = getMockReq({ body: invalidGenreInput });
    const { res, next } = getMockRes();

    const middleware = validateBody(genreInputSchema);
    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(new ApiError("Invalid input", 400));
  });
});
