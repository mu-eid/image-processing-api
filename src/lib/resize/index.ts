import sharp from 'sharp';
import { readFile } from 'fs/promises';
import { inputFileName, outputFileName } from './utils';

async function resize(name: string, width: number, height: number) {
    try {
        const buffer = await readFile(inputFileName(name));
        const image = sharp(buffer);

        image
            .resize({ width: width, height: height })
            .jpeg()
            .toFile(outputFileName(name, width, height));
            
    } catch (err) {
        const error = err as unknown as Error;
        console.log(`[file: ${name}] - Error: ${error.name}`);
        throw error;
    }
}

export default resize;
