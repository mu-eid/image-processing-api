import express from 'express';
import path from 'path';

import ImageCache from '../../lib/cache';
import resize from '../../lib/resize';
import { outputFilePath } from '../../lib/resize/utils';

const resize_api = express.Router();
const imageCache = new ImageCache();

resize_api.get('/', async (req, resp) => {
    // Expected request URL:
    // http://127.0.0.1:7001/resize?image=fjord&width=300&height=200

    // [1] Try to extrcat the key/value pairs from query string
    const image = req.query.image as string;
    const width = parseInt(req.query.width as string, 10);
    const height = parseInt(req.query.height as string, 10);

    // [2] Handle the absence of query string values
    let errorMessage = '';

    if (!image) {
        errorMessage = 'Need to provide an [image] name value';
    } else if (!width) {
        errorMessage = 'Need to provide a [width] value for resizing';
    } else if (!height) {
        errorMessage = 'Need to provide a [height] value for resizing';
    }

    if (errorMessage !== '') {
        resp.status(400);
        resp.json({ error: { message: errorMessage } });
        return;
    }

    // [3] serve the request
    const outputPath = outputFilePath(image, width, height);
    const imageName = path.basename(outputPath);

    if (await imageCache.has(imageName)) {
        resp.sendFile(outputPath);
        return;
    }
    resize(image, width, height)
        .then(() => {
            imageCache.store(imageName);
            resp.sendFile(outputPath);
        })
        .catch((err) => {
            const error = err as Error;
            resp.status(404);
            resp.json({
                error: {
                    message: 'Resizing: something went wrong.',
                    reason: error.message.includes('ENOENT')
                        ? 'No such image file'
                        : error.message,
                },
            });
        });
});

export default resize_api;
