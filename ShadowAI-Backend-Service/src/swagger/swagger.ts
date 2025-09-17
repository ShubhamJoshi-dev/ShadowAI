import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shadow-AI API Documentation',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        XCorrelationId: {
          type: 'apiKey',
          in: 'header',
          name: 'X-Correlation-Id', 
          description: 'Unique ID to trace the request across services.',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.resolve(__dirname, '../routers/routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
