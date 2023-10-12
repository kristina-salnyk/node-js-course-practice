import {ObjectSchema} from "joi";
import {NextFunction, Request, Response} from "express";

import MovieInput from "../interfaces/MovieInput";
import ApiError from "../interfaces/ApiError";

const validateBody = (schema: ObjectSchema<MovieInput>) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (Object.keys(req.body).length === 0) {
      const e = new Error('Invalid input') as ApiError;
      e.status = 400;
      return next(e);
    }

    const {error} = schema.validate(req.body);
    if (error) {
      const e = new Error(error.message) as ApiError;
      e.status = 400;
      return next(e);
    }
    return next();
  };
};

export default validateBody;
