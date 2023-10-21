import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import * as movieService from "../services/movies";
import * as genreService from "../services/genres";
import ApiError from "../errors/ApiError";

export const getMovies = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const movies = await movieService.getMovies();
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

export const getMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const movie = await movieService.getMovieById(id);

    if (!movie) {
      const e = new ApiError("Movie not found", 404);
      return next(e);
    }

    res.json(movie);
  } catch (error) {
    next(error);
  }
};

export const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, releaseDate, genre } = req.body;
    const genreCount = await genreService.countGenres(genre);

    if (genreCount !== genre.length) {
      const e = new ApiError("Genre not found", 404);
      return next(e);
    }

    const movie = await movieService.createMovie({
      title,
      description,
      releaseDate,
      genre
    });
    res.status(201).json(movie);
  } catch (error) {
    if (error instanceof mongoose.mongo.MongoError && error.code === 11000) {
      const e = new ApiError("Movie already exists", 409);
      return next(e);
    }
    next(error);
  }
};

export const removeMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const movie = await movieService.getMovieById(id);

    if (!movie) {
      const e = new ApiError("Movie not found", 404);
      return next(e);
    }

    await movieService.removeMovie(id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const updateMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, releaseDate, genre } = req.body;
    const genreCount = await genreService.countGenres(genre);

    if (genreCount !== genre.length) {
      const e = new ApiError("Genre not found", 404);
      return next(e);
    }

    const movie = await movieService.updateMovie(id, {
      title,
      description,
      releaseDate,
      genre
    });

    if (!movie) {
      const e = new ApiError("Movie not found", 404);
      return next(e);
    }

    res.json(movie);
  } catch (error) {
    if (error instanceof mongoose.mongo.MongoError && error.code === 11000) {
      const e = new ApiError("Movie already exists", 409);
      return next(e);
    }
    next(error);
  }
};
