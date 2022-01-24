import express, { Request, Response } from 'express';
import process from 'process';
import resize_api from './api/resize';
import { logger } from './lib/logger';

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 7001;

export const app = express();

app.use(logger);
app.use('/resize', resize_api);

app.get('/about', (req: Request, resp: Response): void => {
    resp.send(
        'Simple image resizing API, please check README.md file for more info.'
    );
});

app.get('/ping', (req: Request, resp: Response): void => {
    resp.json({ response: 'pong' });
});

app.listen(PORT, (): void => {
    console.log(`Server is running at address http://${HOST}:${PORT}/about`);
});
