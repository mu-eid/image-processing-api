import express from 'express';
import process from 'process';

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 7001;

export const app = express();

app.get('/', (req, resp) => {
    resp.send('Server is working!!!');
});

app.get('/ping', (req, resp) => {
    resp.json({ response: 'pong' });
});

app.listen(PORT, () => {
    console.log(`Server is running at address http://${HOST}:${PORT}`);
});
