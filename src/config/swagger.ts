import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { generateSwaggerSpec } from "./swaggerOptions";

/**
 * Mount Swagger UI at /api-docs so people can read and try endpoints in the browser.
 */
const setupSwagger = (app: Express): void => {
  const specs = generateSwaggerSpec();
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

export default setupSwagger;
