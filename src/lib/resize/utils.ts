import path from 'path';

const INPUT_DIR = './images/in';
const OUTPUT_DIR = './images/out';

function outputFileName(name: string, width: number, height: number): string {
    return path.resolve(OUTPUT_DIR, `${name}-w${width}-h${height}.jpg`);
}

function inputFileName(name: string): string {
    return path.resolve(INPUT_DIR, `${name}.jpg`);
}

export { inputFileName, outputFileName };
