import swaggerJsdoc from "swagger-jsdoc";

/**
 * swagger-jsdoc: merges this `definition` with @openapi blocks in route + validation files.
 */
const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Resource Library API",
      version: "1.0.0",
      description: "API docs for the resource library coding challenge",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local server (change port in .env if needed)",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Firebase ID token — Module 4: Authorization: Bearer <idToken>",
        },
      },
    },
  },
  apis: [
    "./src/api/v1/routes/*.ts",
    "./src/api/v1/openapi/*.ts",
    "./src/api/v1/validation/*.ts",
  ],
};

export const generateSwaggerSpec = (): object => {
  return swaggerJsdoc(swaggerOptions);
};
