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
      },
      parameters: {
        XCorrelationId: {
          name: 'X-Correlation-Id',
          in: 'header',
          required: false,
          schema: { type: 'string' },
          description: 'Unique ID to trace the request across services.',
        },
        StatusFieldParam: {
          name: 'isparams',
          in: 'query',
          required: true,
          schema: {
            type: 'string',
            enum: ['isDeactivated', 'isDeleted'],
          },
          example: 'isDeactivated',
          description: 'The field of the user status to update.',
        },
        StatusValueParam: {
          name: 'value',
          in: 'query',
          required: true,
          schema: {
            type: 'boolean',
          },
          example: false,
          description: 'The value to set for the status field.',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.resolve(__dirname, '../routers/routes/*.js')],
};



const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
