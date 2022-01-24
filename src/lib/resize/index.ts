import toImage from 'sharp';
import { readFile } from 'fs/promises';
import { inPath, outPath } from './utils';

function resize(
    name: string,
    width: number,
    height: number
): Promise<toImage.OutputInfo> {
    return readFile(inPath(name))
        .then(toImage)
        .then((image) =>
            image
                .resize({ width: width, height: height })
                .jpeg()
                .toFile(outPath(name, width, height))
        )
        .catch((err) => {
            const error = err as Error;
            throw error;
        });
}

export default resize;
