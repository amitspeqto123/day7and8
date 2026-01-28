import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "Industry level E-commerce APIs",
    },
    servers: [
      { url: "http://localhost:8080" }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./docs/**/*.swagger.js"], // 🔥 industry magic
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
