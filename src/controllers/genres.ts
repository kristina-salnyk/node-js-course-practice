import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import * as service from "../services/genres";
import ApiError from "../errors/ApiError";

export const getGenres = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const genres = await service.getGenres();
    res.json(genres);
  } catch (error) {
    next(error);
  }
};

export const getGenreById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const genre = await service.getGenreById(id);

    if (!genre) {
      const e = new ApiError("Genre not found", 404);
      return next(e);
    }

    res.json(genre);
  } catch (error) {
    next(error);
  }
};

export const createGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.body;
    const genre = await service.createGenre({ name });
    res.status(201).json(genre);
  } catch (error) {
    if (error instanceof mongoose.mongo.MongoError && error.code === 11000) {
      const e = new ApiError("Genre already exists", 409);
      return next(e);
    }
    next(error);
  }
};

export const removeGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const genre = await service.getGenreById(id);

    if (!genre) {
      const e = new ApiError("Genre not found", 404);
      return next(e);
    }

    await service.removeGenre(id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const updateGenre = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const genre = await service.updateGenre(id, { name });

    if (!genre) {
      const e = new ApiError("Genre not found", 404);
      return next(e);
    }

    res.json(genre);
  } catch (error) {
    if (error instanceof mongoose.mongo.MongoError && error.code === 11000) {
      const e = new ApiError("Genre already exists", 409);
      return next(e);
    }
    next(error);
  }
};
