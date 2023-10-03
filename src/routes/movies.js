const express = require('express');
const {getMovies, getMovieById, addMovie, removeMovie, updateMovie} = require('../services/movies');
const validateBody = require('../middlewares/validateBody');
const movieInputSchema = require('../schemas/movieInputSchema');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Endpoints for managing movies
 * components:
 *  schemas:
 *    Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The movie id
 *           example: 1
 *         title:
 *           type: string
 *           description: The movie title
 *           example: The Matrix
 *         description:
 *           type: string
 *           description: The movie description
 *           example: A computer hacker learns from mysterious rebels about the true nature of his reality.
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *           description: The movie genre
 *           example: [Action]
 *         duration:
 *           type: number
 *           description: The movie duration in minutes
 *           example: 136
 *    MovieInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The movie title
 *           example: The Matrix
 *         description:
 *           type: string
 *           description: The movie description
 *           example: A computer hacker learns from mysterious rebels about the true nature of his reality.
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *           description: The movie genre
 *           example: [Action]
 *         duration:
 *           type: number
 *           description: The movie duration in minutes
 *           example: 136
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get a list of movies
 *     tags: [Movies]
 *     parameters: []
 *     responses:
 *       200:
 *         description: Returns a list of movies
 *         content:
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
router.get('/', async (req, res, next) => {
  try {
    const movies = await getMovies();
    res.json(movies);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/movies/{movieId}:
 *   get:
 *     summary: Get a movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: Id of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a movie by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *                   example: Movie not found
 *       500:
 *          $ref: '#/components/responses/InternalServerErrorResponse'
 */
router.get('/:movieId', async (req, res, next) => {
  try {
    const {movieId} = req.params;
    const movie = await getMovieById(movieId);

    if (!movie) {
      return res.status(404).json({error: 'Movie not found'});
    }

    res.json(movie);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Add a new movie
 *     tags: [Movies]
 *     requestBody:
 *       description: Movie details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieInput'
 *     responses:
 *       201:
 *         description: Returns the created movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *                   example: Invalid input data
 *       404:
 *          $ref: '#/components/responses/NotFoundErrorResponse'
 *       500:
 *          $ref: '#/components/responses/InternalServerErrorResponse'
 */
router.post('/', validateBody(movieInputSchema), async (req, res, next) => {
  try {
    const {title, description, genre, duration} = req.body;
    const movie = await addMovie({title, description, genre, duration});
    res.status(201).json(movie);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/movies/{movieId}:
 *   delete:
 *     summary: Delete a movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: Id of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *                   example: Movie not found
 *       500:
 *          $ref: '#/components/responses/InternalServerErrorResponse'
 */
router.delete('/:movieId', async (req, res, next) => {
  try {
    const {movieId} = req.params;
    const movie = await getMovieById(movieId);

    if (!movie) {
      return res.status(404).json({error: 'Movie not found'});
    }

    await removeMovie(movieId);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/movies/{movieId}:
 *   put:
 *     summary: Update a movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: Id of the movie
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated movie details
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
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *                   example: Invalid input data
 *       404:
 *         description: Movie not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *                   example: Movie not found
 *       500:
 *          $ref: '#/components/responses/InternalServerErrorResponse'
 */
router.put('/:movieId', validateBody(movieInputSchema), async (req, res, next) => {
  try {
    const {movieId} = req.params;
    const {title, description, genre, duration} = req.body;
    const movie = await updateMovie(movieId, {title, description, genre, duration});
    res.json(movie);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
