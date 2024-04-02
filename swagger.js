import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Use OpenAPI 3.0 for consistency
    info: {
      title: "Carbon Cell Backend Task API", // Customize this with your API name
      version: "1.0.0",
      description: "Documentation for the CarbonCellBackendTask API",
    },
    servers: [
      {
        url: "https://carboncellbackendtask.onrender.com",
      },
      {
        url: "http://localhost:8080",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          in: "header",
          name: "Authorization",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            description: "The user's ID",
          },
          userName: {
            type: "string",
            description: "The username of the user",
          },
          password: {
            type: "string",
            description: "The password of the user (hashed)",
          },
          createdAt: {
            type: "string",
            description: "The timestamp of user creation",
          },
          updatedAt: {
            type: "string",
            description: "The timestamp of last user update",
          },
        },
      },
    },
  },
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
