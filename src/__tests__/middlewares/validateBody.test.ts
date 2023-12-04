import { ValidationError, ValidationResult } from "joi";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { genreInput } from "../../__mocks__/genre";
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

    const mockValidate = jest.fn(
      () =>
        ({
          error: undefined,
          value: {}
        }) as ValidationResult
    );
    jest.spyOn(genreInputSchema, "validate").mockImplementation(mockValidate);

    const middleware = validateBody(genreInputSchema);
    middleware(req, res, next);

    expect(mockValidate).toHaveBeenCalledWith(genreInput);
    expect(next).toHaveBeenCalledWith();
  });

  test("should respond with an error if request body is empty", async (): Promise<void> => {
    const req = getMockReq({ body: {} });
    const { res, next } = getMockRes();

    const mockValidate = jest.fn(
      () =>
        ({
          error: undefined,
          value: {}
        }) as ValidationResult
    );
    jest.spyOn(genreInputSchema, "validate").mockImplementation(mockValidate);

    const middleware = validateBody(genreInputSchema);
    middleware(req, res, next);

    expect(mockValidate).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new ApiError("Invalid input", 400));
  });

  test("should respond with an error if request body is not valid", async (): Promise<void> => {
    const req = getMockReq({ body: genreInput });
    const { res, next } = getMockRes();

    const mockValidate = jest.fn(
      () =>
        ({
          error: new ValidationError("Invalid input", [], {}),
          value: {}
        }) as ValidationResult
    );
    jest.spyOn(genreInputSchema, "validate").mockImplementation(mockValidate);

    const middleware = validateBody(genreInputSchema);
    middleware(req, res, next);

    expect(mockValidate).toHaveBeenCalledWith(genreInput);
    expect(next).toHaveBeenCalledWith(new ApiError("Invalid input", 400));
  });
});
