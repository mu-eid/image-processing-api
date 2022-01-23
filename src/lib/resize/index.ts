import toImage from 'sharp';
import { readFile } from 'fs/promises';
import { inputFilePath, outputFilePath } from './utils';

function resize(
    name: string,
    width: number,
    height: number
): Promise<toImage.OutputInfo> {
    return readFile(inputFilePath(name))
        .then(toImage)
        .then((image) =>
            image
                .resize({ width: width, height: height })
                .jpeg()
                .toFile(outputFilePath(name, width, height))
        )
        .catch((err) => {
            const error = err as Error;
            throw error;
        });
}

export default resize;
