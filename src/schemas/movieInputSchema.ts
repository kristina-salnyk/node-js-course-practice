import Joi from "joi";

const movieInputSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ "any.required": "Missing required title field" }),
  description: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({ "any.required": "Missing required description field" }),
  genre: Joi.array().items(Joi.string().min(3).max(30)).required().messages({
    "any.required": "Missing required genre field"
  }),
  duration: Joi.number().integer().min(1).max(500).required().messages({
    "any.required": "Missing required duration field"
  })
});

export default movieInputSchema;
