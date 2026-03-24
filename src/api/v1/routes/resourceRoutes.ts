import express from "express";
import { validateRequest } from "../middleware/validate";
import * as resourceController from "../controllers/resourceController";
import { resourceSchemas } from "../validations/resourceSchema";

const resourceRouter = express.Router();

/**
 * @openapi
 * /resources:
 *   post:
 *     summary: Create a new resource item
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - type
 *             properties:
 *               id:
 *                 type: number
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "test resource"
 *               description:
 *                 type: string
 *                 example: "This is a test resource."
 *               url:
 *                 type: string
 *                 example: "https://expressjs.com/en/guide"
 *               type:
 *                 type: string
 *                 example: "article"
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the item was created
 *                 example: "2024-01-15T10:30:00Z"
 *     responses:
 *       '201':
 *         description: Resource created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

resourceRouter.post(
  "/",
  validateRequest(resourceSchemas.create),
  resourceController.createResource,
);

resourceRouter.get("/", resourceController.getAllResources);
resourceRouter.get(
  "/:id",
  validateRequest(resourceSchemas.getById),
  resourceController.getResourceById,
);

export default resourceRouter;
