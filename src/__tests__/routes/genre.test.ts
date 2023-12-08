import express from "express";
import { getMockReq, getMockRes } from "@jest-mock/express";
import genresRouter from "../../routes/genres";
import * as genreController from "../../controllers/genres";
import { genreId, genreInput } from "../../__mocks__/genre";

jest.mock("../../controllers/genres", () => ({
  getGenres: jest.fn(),
  getGenreById: jest.fn(),
  createGenre: jest.fn(),
  removeGenre: jest.fn(),
  updateGenre: jest.fn()
}));

describe("Genre Routes", (): void => {
  const app = express();
  app.use(express.json());
  app.use("/api/genres", genresRouter);

  afterEach((): void => {
    jest.clearAllMocks();
  });

  it("GET /api/genres should call getGenres controller", async (): Promise<void> => {
    const req = getMockReq({ method: "GET", url: "/api/genres" });
    const { res } = getMockRes();

    await app(req, res);

    expect(genreController.getGenres).toHaveBeenCalled();
  });

  it("GET /api/genres/:id should call getGenreById controller", async (): Promise<void> => {
    const req = getMockReq({
      method: "GET",
      url: `/api/genres/${genreId}`
    });
    const { res } = getMockRes();

    await app(req, res);

    expect(genreController.getGenreById).toHaveBeenCalled();
  });

  it("POST /api/genres should call createGenre controller", async (): Promise<void> => {
    const req = getMockReq({
      method: "POST",
      url: "/api/genres",
      body: genreInput
    });
    const { res } = getMockRes();

    await app(req, res);

    expect(genreController.createGenre).toHaveBeenCalled();
  });

  it("DELETE /api/genres/:id should call removeGenre controller", async (): Promise<void> => {
    const req = getMockReq({
      method: "DELETE",
      url: `/api/genres/${genreId}`
    });
    const { res } = getMockRes();

    await app(req, res);

    expect(genreController.removeGenre).toHaveBeenCalled();
  });

  it("PUT /api/genres/:id should call updateGenre controller", async (): Promise<void> => {
    const req = getMockReq({
      method: "PUT",
      url: `/api/genres/${genreId}`,
      body: genreInput
    });
    const { res } = getMockRes();

    await app(req, res);

    expect(genreController.updateGenre).toHaveBeenCalled();
  });
});
