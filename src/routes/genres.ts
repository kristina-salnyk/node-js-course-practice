import express, {NextFunction, Request, Response} from "express";
import {getGenreById, getGenres} from "../services/genres";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: Endpoints for managing genres
 * components:
 *  schemas:
 *    Genre:
 *      type: object
 *      properties:
 *       id:
 *        type: string
 *        description: The genre id
 *        example: 1
 *       name:
 *        type: string
 *        description: The genre name
 *        example: Action
 */

/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Get a list of genres
 *     tags: [Genres]
 *     parameters: []
 *     responses:
 *       200:
 *         description: Returns a list of genres
 *         content:
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
router.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const genres = await getGenres();
    res.json(genres);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/genres/{genreId}:
 *   get:
 *     summary: Get a genre by id
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: genreId
 *         required: true
 *         description: Id of the genre
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a genre by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         description: Genre not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *                   example: Genre not found
 *       500:
 *          $ref: '#/components/responses/InternalServerErrorResponse'
 */
router.get('/:genreId', async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const {genreId} = req.params;
    const genre = await getGenreById(genreId);

    if (!genre) {
      return res.status(404).json({error: 'Genre not found'});
    }

    res.json(genre);
  } catch (error) {
    next(error);
  }
});

export default router;
