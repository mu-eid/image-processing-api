import sharp from 'sharp';
import { readFile } from 'fs/promises';
import path from 'path';

const INPUT_DIR = './images/in';
const OUTPUT_DIR = './images/out';

async function resize(name: string, width: number, height: number) {
    try {
        const buffer = await readFile(path.resolve(INPUT_DIR, `${name}.jpg`));
        const image = sharp(buffer);

        image
            .resize({ width: width, height: height })
            .jpeg()
            .toFile(
                path.resolve(OUTPUT_DIR, `${name}-w${width}-h${height}.jpg`)
            );
    } catch (err) {
        const error = err as unknown as Error;
        console.log(`[file: ${name}] - Error: ${error.name}`);
        throw error;
    }
}

export default resize;
