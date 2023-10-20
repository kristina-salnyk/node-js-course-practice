import { isValidObjectId } from "mongoose";
import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";

const validateId = () => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      const e = new ApiError(`${id} is not correct`, 400);
      return next(e);
    }

    return next();
  };
};

export default validateId;
