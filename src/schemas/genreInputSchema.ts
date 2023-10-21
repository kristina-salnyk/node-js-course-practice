import Joi from "joi";

const genreInputSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ "any.required": "Missing required name field" })
});

export default genreInputSchema;
