import express from "express";
import {
  createGenre,
  getGenreById,
  getGenres,
  removeGenre,
  updateGenre
} from "../controllers/genres";
import validateBody from "../middlewares/validateBody";
import validateId from "../middlewares/validateId";
import genreInputSchema from "../schemas/genreInputSchema";

const router = express.Router();

/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Get a list of genres
 *     tags: [Genres]
 *     parameters: []
 *     responses:
 *       200:
 *          description: Returns a list of genres
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *       404:
 *          $ref: '#/components/responses/NotFoundErrorResponse'
 *       500:
 *          $ref: '#/components/responses/InternalServerErrorResponse'
 */
router.get("/", getGenres);

/**
 * @swagger
 * /api/genres/{id}:
 *   get:
 *     summary: Get a genre by id
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the new genre
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *          description: Returns a genre by id
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       400:
 *          $ref: '#/components/responses/InvalidIdResponse'
 *       404:
 *          $ref: '#/components/responses/GenreNotFoundResponse'
 *       500:
 *          $ref: '#/components/responses/InternalServerErrorResponse'
 */
router.get("/:id", validateId(), getGenreById);

/**
 * @swagger
 * /api/genres:
 *   post:
 *     summary: Add a new genre
 *     tags: [Genres]
 *     requestBody:
 *       description: The details of the new genre
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GenreInput'
 *     responses:
 *       201:
 *          description: Returns the created genre
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       400:
 *          $ref: '#/components/responses/InvalidInputResponse'
 *       404:
 *          $ref: '#/components/responses/NotFoundErrorResponse'
 *       409:
 *          $ref: '#/components/responses/GenreExistsResponse'
 *       500:
 *          $ref: '#/components/responses/InternalServerErrorResponse'
 */
router.post("/", validateBody(genreInputSchema), createGenre);

/**
 * @swagger
 * /api/genres/{id}:
 *   delete:
 *     summary: Delete a genre by id
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the genre
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *          description: Genre deleted successfully
 *       400:
 *          $ref: '#/components/responses/InvalidIdResponse'
 *       404:
 *          $ref: '#/components/responses/GenreNotFoundResponse'
 *       500:
 *          $ref: '#/components/responses/InternalServerErrorResponse'
 */
router.delete("/:id", validateId(), removeGenre);

/**
 * @swagger
 * /api/genres/{id}:
 *   put:
 *     summary: Update a genre by id
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the genre
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The updated details of the genre
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GenreInput'
 *     responses:
 *       200:
 *          description: Returns the updated genre
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       400:
 *          $ref: '#/components/responses/InvalidInputResponse'
 *       404:
 *          $ref: '#/components/responses/GenreNotFoundResponse'
 *       409:
 *          $ref: '#/components/responses/GenreExistsResponse'
 *       500:
 *          $ref: '#/components/responses/InternalServerErrorResponse'
 */
router.put("/:id", validateId(), validateBody(genreInputSchema), updateGenre);

export default router;
