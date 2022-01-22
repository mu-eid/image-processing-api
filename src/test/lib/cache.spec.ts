import ImageCache from '../../lib/cache';
import resize from '../../lib/resize';
import { outputFilePath } from '../../lib/resize/utils';

import path from 'path';

describe('ImageCashe Class', () => {
    const cache = new ImageCache();

    describe('New instance', () => {
        describe('When Empty', () => {
            it('should be empty while no resizing operation has happend yet', () => {
                expect(cache.isEmpty()).toEqual(true);
            });
        });

        describe('When Non Empty', () => {
            let resizedImageName: string;

            beforeAll(async () => {
                const name = 'santamonica';
                const width = 480;
                const height = 320;

                resizedImageName = path.basename(
                    outputFilePath(name, width, height)
                );

                await resize(name, width, height);
            });

            it('should contain a copy from a newly resized image file', () => {
                cache.store(resizedImageName);
                expect(cache.has(resizedImageName)).toBe(true);
            });
        });
    });
});
