import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";

import ApiError from "../errors/ApiError";
import MovieInput from "../inputs/MovieInput";
import GenreInput from "../inputs/GenreInput";

const validateBody = (schema: ObjectSchema<MovieInput | GenreInput>) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (Object.keys(req.body).length === 0) {
      const e = new ApiError("Invalid input", 400);
      return next(e);
    }

    const { error } = schema.validate(req.body);
    if (error) {
      const e = new ApiError(error.message, 400);
      return next(e);
    }
    return next();
  };
};

export default validateBody;
