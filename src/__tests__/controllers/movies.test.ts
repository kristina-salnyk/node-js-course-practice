import { getMockReq, getMockRes } from "@jest-mock/express";
import mongoose, { Types } from "mongoose";
import {
  createMovie,
  getMovieById,
  getMovies,
  getMoviesByGenre
} from "../../controllers/movies";
import * as movieService from "../../services/movies";
import * as genreService from "../../services/genres";
import ApiError from "../../errors/ApiError";
import { movieDocument, movieId, movieInput } from "../../__mocks__/movie";
import { genreId } from "../../__mocks__/genre";

describe("Movie Controller", (): void => {
  afterEach((): void => {
    jest.clearAllMocks();
  });
  describe("Get movie list", (): void => {
    it("should respond with a list of movies", async (): Promise<void> => {
      const req = getMockReq();
      const { res, next } = getMockRes();

      jest.spyOn(movieService, "getMovies").mockResolvedValue([movieDocument]);

      await getMovies(req, res, next);

      expect(movieService.getMovies).toHaveBeenCalledWith();
      expect(res.json).toHaveBeenCalledWith([movieDocument]);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("Get movie by id", (): void => {
    it("should respond with a movie by id", async (): Promise<void> => {
      const req = getMockReq({ params: { id: movieId } });
      const { res, next } = getMockRes();

      jest.spyOn(movieService, "getMovieById").mockResolvedValue(movieDocument);

      await getMovieById(req, res, next);

      expect(movieService.getMovieById).toHaveBeenCalledWith(movieId);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ _id: new Types.ObjectId(movieId) })
      );
      expect(next).not.toHaveBeenCalled();
    });

    it("should respond with an error if movie is not found", async (): Promise<void> => {
      const req = getMockReq({ params: { id: movieId } });
      const { res, next } = getMockRes();

      jest.spyOn(movieService, "getMovieById").mockResolvedValue(null);

      await getMovieById(req, res, next);

      expect(movieService.getMovieById).toHaveBeenCalledWith(movieId);
      expect(next).toHaveBeenCalledWith(new ApiError("Movie not found", 404));
    });
  });

  describe("Get movies by genre", (): void => {
    it("should respond with a list of movies by genre", async (): Promise<void> => {
      const req = getMockReq({ params: { id: genreId } });
      const { res, next } = getMockRes();

      jest.spyOn(genreService, "countGenres").mockResolvedValue(1);

      jest
        .spyOn(movieService, "getMoviesByGenre")
        .mockResolvedValue([movieDocument]);

      await getMoviesByGenre(req, res, next);

      expect(movieService.getMoviesByGenre).toHaveBeenCalledWith(genreId);
      expect(res.json).toHaveBeenCalledWith([
        expect.objectContaining({
          genre: [
            expect.objectContaining({
              _id: new Types.ObjectId(genreId)
            })
          ]
        })
      ]);
      expect(next).not.toHaveBeenCalled();
    });

    it("should respond with an error if genre is not found", async (): Promise<void> => {
      const req = getMockReq({ params: { id: genreId } });
      const { res, next } = getMockRes();

      jest.spyOn(genreService, "countGenres").mockResolvedValue(0);

      await getMoviesByGenre(req, res, next);

      expect(genreService.countGenres).toHaveBeenCalledWith([genreId]);
      expect(next).toHaveBeenCalledWith(new ApiError("Genre not found", 404));
    });
  });

  describe("Create movie", (): void => {
    it("should respond with a created movie", async (): Promise<void> => {
      const req = getMockReq({ body: movieInput });
      const { res, next } = getMockRes();

      jest.spyOn(genreService, "countGenres").mockResolvedValue(1);

      jest.spyOn(movieService, "createMovie").mockResolvedValue(movieDocument);

      await createMovie(req, res, next);

      expect(movieService.createMovie).toHaveBeenCalledWith(movieInput);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          title: movieInput.title,
          description: movieInput.description,
          releaseDate: new Date(movieInput.releaseDate),
          genre: [
            expect.objectContaining({
              _id: new Types.ObjectId(genreId)
            })
          ]
        })
      );
      expect(next).not.toHaveBeenCalled();
    });

    it("should respond with an error if genre is not found", async (): Promise<void> => {
      const req = getMockReq({ body: movieInput });
      const { res, next } = getMockRes();

      jest.spyOn(genreService, "countGenres").mockResolvedValue(0);

      await createMovie(req, res, next);

      expect(genreService.countGenres).toHaveBeenCalledWith(movieInput.genre);
      expect(next).toHaveBeenCalledWith(new ApiError("Genre not found", 404));
    });

    it("should respond with an error if movie already exists", async (): Promise<void> => {
      const req = getMockReq({ body: movieInput });
      const { res, next } = getMockRes();

      jest.spyOn(genreService, "countGenres").mockResolvedValue(1);

      const error = new mongoose.mongo.MongoError(
        "E11000 duplicate key error collection"
      );
      error.code = 11000;
      jest.spyOn(movieService, "createMovie").mockRejectedValue(error);

      await createMovie(req, res, next);

      expect(movieService.createMovie).toHaveBeenCalledWith(movieInput);
      expect(next).toHaveBeenCalledWith(
        new ApiError("Movie already exists", 409)
      );
    });
  });
});
