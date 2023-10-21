import express from "express";
import {
  createMovie,
  getMovieById,
  getMovies,
  removeMovie,
  updateMovie
} from "../controllers/movies";
import validateBody from "../middlewares/validateBody";
import movieInputSchema from "../schemas/movieInputSchema";

const router = express.Router();

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get a list of movies
 *     tags: [Movies]
 *     parameters: []
 *     responses:
 *       200:
 *          description: Returns a list of movies
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       404:
 *          $ref: '#/components/responses/NotFoundErrorResponse'
 *       500:
 *          $ref: '#/components/responses/InternalServerErrorResponse'
 */
router.get("/", getMovies);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get a movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *          description: Returns a movie by id
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *          $ref: '#/components/responses/InvalidIdResponse'
 *       404:
 *          $ref: '#/components/responses/MovieNotFoundResponse'
 *       500:
 *          $ref: '#/components/responses/InternalServerErrorResponse'
 */
router.get("/:id", getMovieById);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Add a new movie
 *     tags: [Movies]
 *     requestBody:
 *       description: The details of the new movie
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieInput'
 *     responses:
 *       201:
 *          description: Returns the created movie
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *          $ref: '#/components/responses/InvalidInputResponse'
 *       404:
 *          $ref: '#/components/responses/NotFoundErrorResponse'
 *       409:
 *          $ref: '#/components/responses/MovieExistsResponse'
 *       500:
 *          $ref: '#/components/responses/InternalServerErrorResponse'
 */
router.post("/", validateBody(movieInputSchema), createMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *          description: Movie deleted successfully
 *       400:
 *          $ref: '#/components/responses/InvalidIdResponse'
 *       404:
 *          $ref: '#/components/responses/MovieNotFoundResponse'
 *       500:
 *          $ref: '#/components/responses/InternalServerErrorResponse'
 */
router.delete("/:id", removeMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update a movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the movie
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The updated details of the movie
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieInput'
 *     responses:
 *       200:
 *         description: Returns the updated movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *          $ref: '#/components/responses/InvalidInputResponse'
 *       404:
 *          $ref: '#/components/responses/MovieNotFoundResponse'
 *       409:
 *          $ref: '#/components/responses/MovieExistsResponse'
 *       500:
 *          $ref: '#/components/responses/InternalServerErrorResponse'
 */
router.put("/:id", validateBody(movieInputSchema), updateMovie);

export default router;
