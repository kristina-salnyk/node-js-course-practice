import Joi, { ValidationError } from "joi";
import { getMockReq, getMockRes } from "@jest-mock/express";
import validateBody from "../../middlewares/validateBody";
import ApiError from "../../errors/ApiError";
import { genreInput } from "../../__mocks__/genre";

describe("Validate Body Middleware", (): void => {
  const inputSchema = Joi.object({
    name: Joi.string().required()
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  test("should accept request if request body is valid", async (): Promise<void> => {
    const req = getMockReq({ body: genreInput });
    const { res, next } = getMockRes();

    const mockValidate = jest.fn(() => ({
      error: undefined,
      value: {}
    }));
    jest.spyOn(inputSchema, "validate").mockImplementation(mockValidate);

    const middleware = validateBody(inputSchema);
    middleware(req, res, next);

    expect(mockValidate).toHaveBeenCalledWith(genreInput);
    expect(next).toHaveBeenCalledWith();
  });

  test("should respond with an error if request body is empty", async (): Promise<void> => {
    const req = getMockReq({ body: {} });
    const { res, next } = getMockRes();

    const mockValidate = jest.fn(() => ({
      error: undefined,
      value: {}
    }));
    jest.spyOn(inputSchema, "validate").mockImplementation(mockValidate);

    const middleware = validateBody(inputSchema);
    middleware(req, res, next);

    expect(mockValidate).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new ApiError("Invalid input", 400));
  });

  test("should respond with an error if request body is not valid", async (): Promise<void> => {
    const req = getMockReq({ body: genreInput });
    const { res, next } = getMockRes();

    const mockValidate = jest.fn(() => ({
      error: new ValidationError("Invalid input", [], {}),
      value: {}
    }));
    jest.spyOn(inputSchema, "validate").mockImplementation(mockValidate);

    const middleware = validateBody(inputSchema);
    middleware(req, res, next);

    expect(mockValidate).toHaveBeenCalledWith(genreInput);
    expect(next).toHaveBeenCalledWith(new ApiError("Invalid input", 400));
  });
});
