import { readdir } from 'fs/promises';
import resize from '../../lib/resize';

describe('resize-lib', () => {
    describe('resize function', () => {
        const name = 'fjord';
        const width = 300;
        const height = 200;
        const outputName = `${name}-w${width}-h${height}.jpg`;

        beforeAll(async () => {
            await resize(name, width, height);
        });

        it('should produce an output file if an input file exists.', async () => {
            const images = await readdir('./images/out');
            expect(images.includes(outputName)).toBe(true);
        });

        it('should throw an error if input image does not exist.', async () => {
            await expectAsync(
                resize('no-file-with-that-name', 300, 200)
            ).toBeRejected();
        });
    });
});
