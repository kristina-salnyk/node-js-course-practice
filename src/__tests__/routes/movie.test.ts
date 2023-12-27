import express from "express";
import { getMockReq, getMockRes } from "@jest-mock/express";
import moviesRouter from "../../routes/movies";
import * as movieController from "../../controllers/movies";
import { movieId, movieInput } from "../../__mocks__/movie";
import { genreId } from "../../__mocks__/genre";

jest.mock("../../controllers/movies", () => ({
  getMovies: jest.fn(),
  getMovieById: jest.fn(),
  getMoviesByGenre: jest.fn(),
  createMovie: jest.fn(),
  removeMovie: jest.fn(),
  updateMovie: jest.fn()
}));

describe("Movie Routes", (): void => {
  const app = express();
  app.use(express.json());
  app.use("/api/movies", moviesRouter);

  afterEach((): void => {
    jest.clearAllMocks();
  });

  it("GET /api/movies should call getMovies controller", async (): Promise<void> => {
    const req = getMockReq({ method: "GET", url: "/api/movies" });
    const { res } = getMockRes();

    await app(req, res);

    expect(movieController.getMovies).toHaveBeenCalled();
  });

  it("GET /api/movies/:id should call getMovieById controller", async (): Promise<void> => {
    const req = getMockReq({
      method: "GET",
      url: `/api/movies/${movieId}`
    });
    const { res } = getMockRes();

    await app(req, res);

    expect(movieController.getMovieById).toHaveBeenCalled();
  });

  it("GET /api/movies/genres/:id should call getMoviesByGenre controller", async (): Promise<void> => {
    const req = getMockReq({
      method: "GET",
      url: `/api/movies/genre/${genreId}`
    });
    const { res } = getMockRes();

    await app(req, res);

    expect(movieController.getMoviesByGenre).toHaveBeenCalled();
  });

  it("POST /api/movies should call createMovie controller", async (): Promise<void> => {
    const req = getMockReq({
      method: "POST",
      url: "/api/movies",
      body: movieInput
    });
    const { res } = getMockRes();

    await app(req, res);

    expect(movieController.createMovie).toHaveBeenCalled();
  });

  it("DELETE /api/movies/:id should call removeMovie controller", async (): Promise<void> => {
    const req = getMockReq({
      method: "DELETE",
      url: `/api/movies/${movieId}`
    });
    const { res } = getMockRes();

    await app(req, res);

    expect(movieController.removeMovie).toHaveBeenCalled();
  });

  it("PUT /api/movies/:id should call updateMovie controller", async (): Promise<void> => {
    const req = getMockReq({
      method: "PUT",
      url: `/api/movies/${movieId}`,
      body: movieInput
    });
    const { res } = getMockRes();

    await app(req, res);

    expect(movieController.updateMovie).toHaveBeenCalled();
  });
});
