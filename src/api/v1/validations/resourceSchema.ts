import Joi from "joi";
const resourceType = Joi.string().valid(
  "article",
  "video",
  "tutorial",
  "documentation",
);
export const resourceSchemas = {
  create: {
    body: Joi.object({
      title: Joi.string().trim().min(1).required(),
      type: resourceType.required(),
      url: Joi.string().optional(),
      description: Joi.string().optional(),
    }),
  },

  getById: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },
};
