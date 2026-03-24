import express from "express";
import { validateRequest } from "../middleware/validate";
import * as resourceController from "../controllers/resourceController";
import { resourceSchema } from "../validations/resourceSchema"

const resourceRouter = express.Router();


resourceRouter.post("/", validateRequest(resourceSchema.create), resourceController.createResource);


resourceRouter.get("/", resourceController.getAllResources);
resourceRouter.get("/:id", validateRequest(resourceSchema.getById), resourceController.getResourceById);


export default resourceRouter;