import { readdir } from 'fs/promises';
import resize from '../../lib/resize';
import { outputFilePath } from '../../lib/resize/utils';
import path from 'path';

describe('Resize Library', () => {
    describe('Resize Function', () => {
        const name = 'fjord';
        const width = 300;
        const height = 200;
        const outputName = path.basename(outputFilePath(name, width, height));
        //`${name}-w${width}-h${height}.jpg`;

        beforeAll(async () => {
            await resize(name, width, height);
        });

        it('should produce an output file if input file exists.', async () => {
            const images = await readdir('./images/out');
            expect(images.includes(outputName)).toBe(true);
        });

        it('should throw an error if input file does not exist.', () => {
            expect(() => {
                return resize('no-file-with-that-name', 300, 200);
            }).toThrow;
        });
    });
});
