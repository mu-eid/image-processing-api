import { mkdirSync } from 'fs';
import path from 'path';

const INPUT_DIR = path.join('images', 'in');
const OUTPUT_DIR = path.join('images', 'out');

function outPath(name: string, width: number, height: number): string {
    return path.resolve(OUTPUT_DIR, `${name}-w${width}-h${height}.jpg`);
}

function inPath(name: string): string {
    return path.resolve(INPUT_DIR, `${name}.jpg`);
}

function createOutDir(): void {
    mkdirSync(path.resolve(OUTPUT_DIR));
}

export { createOutDir, outPath, inPath, INPUT_DIR, OUTPUT_DIR };
