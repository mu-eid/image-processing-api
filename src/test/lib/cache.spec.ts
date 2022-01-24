import ImageCache from '../../lib/cache';
import resize from '../../lib/resize';
import { outPath } from '../../lib/resize/utils';

import path from 'path';

describe('ImageCashe Class', () => {
    const cache = new ImageCache();

    describe('New instance', () => {
        describe('When storage directory is [Empty]', () => {
            it('should be empty while no resizing operation has happend yet', () => {
                expect(cache.isEmpty()).toEqual(true);
            });
        });

        describe('When storage directory is [Non-empty]', () => {
            let resizedImageName: string;

            beforeAll(async () => {
                const name = 'santamonica';
                const width = 480;
                const height = 320;

                resizedImageName = path.basename(outPath(name, width, height));

                await resize(name, width, height);
            });

            it('should contain a copy from a newly resized image file', async () => {
                return expect(await cache.has(resizedImageName)).toBe(true);
            });
        });
    });
});
