import express, { Express } from "express";
import cors from "cors";
import {
  accessLogger,
  errorLogger,
  consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import setupSwagger from "./config/swagger";
import { getHelmetConfig } from "./config/helmetConfig";
import { getCorsOptions } from "./config/corsConfig";
import resourceRouter from "./api/v1/routes/resourceRoutes";

/** import the routes **/

const app: Express = express();

if (process.env.NODE_ENV === "production") {
  app.use(accessLogger);
  app.use(errorLogger);
} else {
  app.use(consoleLogger);
}

app.use(getHelmetConfig());
app.use(cors(getCorsOptions()));
app.use(express.json());
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

/** Update the api endppoints with appropriate routes **/
app.use("/api/v1/resources", resourceRouter);
app.use(errorHandler);
setupSwagger(app);
export default app;
