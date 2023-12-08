import { getMockReq, getMockRes } from "@jest-mock/express";
import mongoose, { isValidObjectId } from "mongoose";
import validateId from "../../middlewares/validateId";
import ApiError from "../../errors/ApiError";
import { genreId } from "../../__mocks__/genre";

describe("Validate Id Middleware", (): void => {
  afterEach((): void => {
    jest.clearAllMocks();
  });

  test("should accept request if request id parameter is valid", async (): Promise<void> => {
    const req = getMockReq({ params: { id: genreId } });
    const { res, next } = getMockRes();

    jest.spyOn(mongoose, "isValidObjectId").mockReturnValue(true);

    const middleware = validateId();
    middleware(req, res, next);

    expect(isValidObjectId).toHaveBeenCalledWith(genreId);
    expect(next).toHaveBeenCalledWith();
  });

  test("should respond with an error if request id parameter is not valid", async (): Promise<void> => {
    const req = getMockReq({ params: { id: genreId } });
    const { res, next } = getMockRes();

    jest.spyOn(mongoose, "isValidObjectId").mockReturnValue(false);

    const middleware = validateId();
    middleware(req, res, next);

    expect(isValidObjectId).toHaveBeenCalledWith(genreId);
    expect(next).toHaveBeenCalledWith(new ApiError("Invalid id", 400));
  });
});
