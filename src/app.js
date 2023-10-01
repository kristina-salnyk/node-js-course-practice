const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = require('./configs/swagger-config.json');
const moviesRouter = require('./routes/movies');
const genresRouter = require('./routes/genres');

const app = express();
const swaggerSpec = swaggerJSDoc(options);

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/movies', moviesRouter);
app.use('/api/genres', genresRouter);

/**
 * @swagger
 * components:
 *  schemas:
 *    HealthStatus:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: The health status of the server
 *           example: OK
 * tags:
 *   - name: Health
 *     description: Endpoints for checking the health of the server
 *
 * /health-check:
 *   get:
 *     summary: Check the health of the server
 *     tags: [Health]
 *     parameters: []
 *     responses:
 *       200:
 *         description: Returns a health status message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthStatus'
 *       404:
 *          $ref: '#/components/responses/NotFoundErrorResponse'
 *       500:
 *          $ref: '#/components/responses/InternalServerErrorResponse'
 */
app.get('/health-check', (req, res) => {
  res.send({status: 'OK'});
});

/**
 * @swagger
 * components:
 *  schemas:
 *    NotFoundError:
 *      type: object
 *      properties:
 *        error:
 *          type: string
 *          description: The error message
 *          example: Not found
 *    InternalServerError:
 *      type: object
 *      properties:
 *        error:
 *          type: string
 *          description: The error message
 *          example: Internal server error
 *  responses:
 *    NotFoundErrorResponse:
 *      description: Not Found
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NotFoundError'
 *    InternalServerErrorResponse:
 *      description: Internal Server Error
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/InternalServerError'
 */
app.use((req, res) => {
  res.status(404).json({error: 'Not found'});
});

app.use((err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({error: err.message});
  }

  res.status(500).json({error: 'Internal server error'});
});

module.exports = app;