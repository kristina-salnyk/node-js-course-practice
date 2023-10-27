import Joi from "joi";

const movieInputSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ "any.required": "Missing required title field" }),
  description: Joi.string()
    .min(3)
    .max(1000)
    .required()
    .messages({ "any.required": "Missing required description field" }),
  releaseDate: Joi.date().required().messages({
    "any.required": "Missing required releaseDate field"
  }),
  genre: Joi.array()
    .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .required()
    .messages({
      "any.required": "Missing required genre field"
    })
});

export default movieInputSchema;
