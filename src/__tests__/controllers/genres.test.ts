import { getMockReq, getMockRes } from "@jest-mock/express";
import mongoose, { Types } from "mongoose";
import {
  createGenre,
  getGenreById,
  getGenres,
  removeGenre,
  updateGenre
} from "../../controllers/genres";
import * as genreService from "../../services/genres";
import ApiError from "../../errors/ApiError";
import { genreDocument, genreId, genreInput } from "../../__mocks__/genre";

describe("Genre Controller", (): void => {
  afterEach((): void => {
    jest.clearAllMocks();
  });

  describe("Get genre list", (): void => {
    it("should respond with a list of genres", async (): Promise<void> => {
      const req = getMockReq();
      const { res, next } = getMockRes();

      jest.spyOn(genreService, "getGenres").mockResolvedValue([genreDocument]);

      await getGenres(req, res, next);

      expect(genreService.getGenres).toHaveBeenCalledWith();
      expect(res.json).toHaveBeenCalledWith([genreDocument]);
      expect(next).not.toHaveBeenCalled();
    });

    it("should respond with an error if error occurs", async (): Promise<void> => {
      const req = getMockReq();
      const { res, next } = getMockRes();

      const error = new Error();
      jest.spyOn(genreService, "getGenres").mockRejectedValue(error);

      await getGenres(req, res, next);

      expect(genreService.getGenres).toHaveBeenCalledWith();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("Get genre by id", (): void => {
    it("should respond with a genre by id", async (): Promise<void> => {
      const req = getMockReq({ params: { id: genreId } });
      const { res, next } = getMockRes();

      jest.spyOn(genreService, "getGenreById").mockResolvedValue(genreDocument);

      await getGenreById(req, res, next);

      expect(genreService.getGenreById).toHaveBeenCalledWith(genreId);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ _id: new Types.ObjectId(genreId) })
      );
      expect(next).not.toHaveBeenCalled();
    });

    it("should respond with an error if genre is not found", async (): Promise<void> => {
      const req = getMockReq({ params: { id: genreId } });
      const { res, next } = getMockRes();

      jest.spyOn(genreService, "getGenreById").mockResolvedValue(null);

      await getGenreById(req, res, next);

      expect(genreService.getGenreById).toHaveBeenCalledWith(genreId);
      expect(next).toHaveBeenCalledWith(new ApiError("Genre not found", 404));
    });

    it("should respond with an error if error occurs", async (): Promise<void> => {
      const req = getMockReq({ params: { id: genreId } });
      const { res, next } = getMockRes();

      const error = new Error();
      jest.spyOn(genreService, "getGenreById").mockRejectedValue(error);

      await getGenreById(req, res, next);

      expect(genreService.getGenreById).toHaveBeenCalledWith(genreId);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("Create genre", (): void => {
    it("should respond with a created genre", async (): Promise<void> => {
      const req = getMockReq({ body: genreInput });
      const { res, next } = getMockRes();

      jest.spyOn(genreService, "createGenre").mockResolvedValue(genreDocument);

      await createGenre(req, res, next);

      expect(genreService.createGenre).toHaveBeenCalledWith(genreInput);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          name: genreInput.name
        })
      );
      expect(next).not.toHaveBeenCalled();
    });

    it("should respond with an error if genre already exists", async (): Promise<void> => {
      const req = getMockReq({ body: genreInput });
      const { res, next } = getMockRes();

      const error = new mongoose.mongo.MongoError(
        "E11000 duplicate key error collection"
      );
      error.code = 11000;
      jest.spyOn(genreService, "createGenre").mockRejectedValue(error);

      await createGenre(req, res, next);

      expect(genreService.createGenre).toHaveBeenCalledWith(genreInput);
      expect(next).toHaveBeenCalledWith(
        new ApiError("Genre already exists", 409)
      );
    });

    it("should respond with an error if error occurs", async (): Promise<void> => {
      const req = getMockReq({ body: genreInput });
      const { res, next } = getMockRes();

      const error = new Error();
      jest.spyOn(genreService, "createGenre").mockRejectedValue(error);

      await createGenre(req, res, next);

      expect(genreService.createGenre).toHaveBeenCalledWith(genreInput);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("Remove genre", (): void => {
    it("should respond with OK status", async (): Promise<void> => {
      const req = getMockReq({ params: { id: genreId } });
      const { res, next } = getMockRes();

      jest.spyOn(genreService, "getGenreById").mockResolvedValue(genreDocument);

      jest.spyOn(genreService, "removeGenre").mockResolvedValue();

      await removeGenre(req, res, next);

      expect(genreService.removeGenre).toHaveBeenCalledWith(genreId);
      expect(res.sendStatus).toHaveBeenCalledWith(200);
      expect(next).not.toHaveBeenCalled();
    });

    it("should respond with an error if genre is not found", async (): Promise<void> => {
      const req = getMockReq({ params: { id: genreId } });
      const { res, next } = getMockRes();

      jest.spyOn(genreService, "getGenreById").mockResolvedValue(null);

      await removeGenre(req, res, next);

      expect(genreService.getGenreById).toHaveBeenCalledWith(genreId);
      expect(next).toHaveBeenCalledWith(new ApiError("Genre not found", 404));
    });

    it("should respond with an error if error occurs", async (): Promise<void> => {
      const req = getMockReq({ params: { id: genreId } });
      const { res, next } = getMockRes();

      jest.spyOn(genreService, "getGenreById").mockResolvedValue(genreDocument);

      const error = new Error();
      jest.spyOn(genreService, "removeGenre").mockRejectedValue(error);

      await removeGenre(req, res, next);

      expect(genreService.removeGenre).toHaveBeenCalledWith(genreId);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("Update genre", (): void => {
    it("should respond with an updated genre", async (): Promise<void> => {
      const req = getMockReq({ params: { id: genreId }, body: genreInput });
      const { res, next } = getMockRes();

      jest.spyOn(genreService, "updateGenre").mockResolvedValue(genreDocument);

      await updateGenre(req, res, next);

      expect(genreService.updateGenre).toHaveBeenCalledWith(
        genreId,
        genreInput
      );
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          name: genreInput.name
        })
      );
      expect(next).not.toHaveBeenCalled();
    });

    it("should respond with an error if genre is not found", async (): Promise<void> => {
      const req = getMockReq({ params: { id: genreId }, body: genreInput });
      const { res, next } = getMockRes();

      jest.spyOn(genreService, "updateGenre").mockResolvedValue(null);

      await updateGenre(req, res, next);

      expect(genreService.updateGenre).toHaveBeenCalledWith(
        genreId,
        genreInput
      );
      expect(next).toHaveBeenCalledWith(new ApiError("Genre not found", 404));
    });

    it("should respond with an error if genre already exists", async (): Promise<void> => {
      const req = getMockReq({ params: { id: genreId }, body: genreInput });
      const { res, next } = getMockRes();

      const error = new mongoose.mongo.MongoError(
        "E11000 duplicate key error collection"
      );
      error.code = 11000;
      jest.spyOn(genreService, "updateGenre").mockRejectedValue(error);

      await updateGenre(req, res, next);

      expect(genreService.updateGenre).toHaveBeenCalledWith(
        genreId,
        genreInput
      );
      expect(next).toHaveBeenCalledWith(
        new ApiError("Genre already exists", 409)
      );
    });

    it("should respond with an error if error occurs", async (): Promise<void> => {
      const req = getMockReq({ params: { id: genreId }, body: genreInput });
      const { res, next } = getMockRes();

      const error = new Error();
      jest.spyOn(genreService, "updateGenre").mockRejectedValue(error);

      await updateGenre(req, res, next);

      expect(genreService.updateGenre).toHaveBeenCalledWith(
        genreId,
        genreInput
      );
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
