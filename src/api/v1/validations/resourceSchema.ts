import Joi from "joi";
/**
 * @openapi
 * components:
 *   schemas:
 *     Resource:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - type
 *       properties:
 *         id:
 *           type: number
 *           description: The unique identifier for the resource
 *           example: 1
 *         title:
 *           type: string
 *           description: The title of the resource item
 *           example: "test resource"
 *         description:
 *           type: string
 *           description: The description of the resource item
 *           example: "This is a test resource."
 *         type:
 *           type: string
 *           description: The type of the resource item such as article, video etc.
 *           example: "article"
 *         url:
 *           type: string
 *           description: url link of the resource
 *           example: "https://expressjs.com/en/guide"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the item was created
 *           example: "2024-01-15T10:30:00Z"
 */

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
