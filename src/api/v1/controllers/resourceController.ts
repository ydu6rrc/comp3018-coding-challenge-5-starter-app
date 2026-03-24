import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as resourceService from "../services/resourceService";
import { Resource } from "../models/resource";

// Handler for getAllResources route
export const getAllResources = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const resources: Resource[] = await resourceService.getAllResources();

    res.status(HTTP_STATUS.OK).json({
      message: "Resources received",
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    next(error);
  }
};

// Handler for getResourceById route
export const getResourceById = (req: Request, res: Response): void => {
  const resource: Resource | null = resourceService.getResourceById(
    Number(req.params.id),
  );
  if (resource) {
    res
      .status(HTTP_STATUS.OK)
      .json({ message: "Resource found", data: resource });
  } else {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Resource not found" });
  }
};

// Handler for createResource route
export const createResource = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const validTypes = ["article", "video", "tutorial", "documentation"];
    // Check if required fields exist
    if (!req.body.title) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Missing required field: title",
      });
    } else if (!req.body.description) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Missing required field: description",
      });
    } else if (!req.body.type) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Missing required field: type",
      });
    } else if (!validTypes.includes(req.body.type)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message:
          "Invalid type. Must be one of: article, video, tutorial, documentation",
      });
    } else {
      // Call service with the data
      const { title, description, type, url, createdAt } = req.body;
      const resourceData = { title, description, type, url, createdAt };
      const newResource: Resource =
        await resourceService.createResource(resourceData);

      res.status(HTTP_STATUS.CREATED).json({
        message: "Resource created successfully",
        data: newResource,
      });
    }
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to create Resource",
    });
  }
};
