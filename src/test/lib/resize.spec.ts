import { readdir } from 'fs/promises';
import resize from '../../lib/resize';

describe('resize-lib', () => {
    describe('resize function', () => {
        it('should produce an output file if an input file exists.', async () => {
            const name = 'fjord';
            const width = 300;
            const height = 200;

            await resize(name, width, height);

            const outputName = `${name}-w${width}-h${height}.jpg`;

            const images = await readdir('./images/out');

            expect(images.includes(outputName)).toBe(true);
        });
    });
});
