import { readdir } from 'fs/promises';
import path from 'path';

import resize from '../../lib/resize';
import { outPath, OUTPUT_DIR } from '../../lib/resize/utils';

describe('Resize Library', () => {
    describe('Resize Function', () => {
        const name = 'fjord';
        const width = 300;
        const height = 200;

        //`${name}-w${width}-h${height}.jpg`;
        const outputName = path.basename(outPath(name, width, height));

        beforeAll(async () => {
            await resize(name, width, height);
        });

        it('should produce an output file if input file exists.', async () => {
            const images = await readdir(OUTPUT_DIR);
            expect(images.includes(outputName)).toBe(true);
        });

        it('should throw an error if input file does not exist.', () => {
            expect(async () => {
                return await resize('no-file-with-that-name', 300, 200);
            }).toThrow;
        });
    });
});
