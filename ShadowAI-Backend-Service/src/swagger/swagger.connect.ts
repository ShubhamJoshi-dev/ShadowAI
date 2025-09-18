import { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import shadowAiLogger from '../libs/logger.libs';

function swaggerDocs(app: Application, port: string) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/docs.json', (req: Request, res: Response): void => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  shadowAiLogger.info(`Docs Available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
