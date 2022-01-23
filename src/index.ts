import express from 'express';
import process from 'process';
import resize_api from './api/resize';
import { logger } from './lib/logger';

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 7001;

export const app = express();

app.use(logger);
app.use('/resize', resize_api);

app.get('/about', (req, resp) => {
    resp.send(
        'Simple image resizing API, please read README.md file for more info.'
    );
});

app.get('/ping', (req, resp) => {
    resp.json({ response: 'pong' });
});

app.listen(PORT, () => {
    console.log(`Server is running at address http://${HOST}:${PORT}/about`);
});
