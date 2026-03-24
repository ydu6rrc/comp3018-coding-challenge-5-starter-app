import express from "express";
import { validateRequest } from "../middleware/validate";
import * as resourceController from "../controllers/resourceController";
import { resourceSchemas } from "../validations/resourceSchema";

const resourceRouter = express.Router();

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
