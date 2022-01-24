import { existsSync } from 'fs';
import { readdir } from 'fs/promises';
import { createOutDir, OUTPUT_DIR } from '../resize/utils';

class ImageCache {
    private cache = new Map<string, boolean>();

    constructor() {
        if (!existsSync(OUTPUT_DIR)) createOutDir();

        readdir(OUTPUT_DIR)
            .then((images) => images.forEach(this.store))
            .catch((err) => {
                const error = err as Error;
                console.error(
                    `[LOG]: Error while creating image cache -- Message: ${error.message}`
                );
            });
    }

    get size(): number {
        return this.cache.size;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    store(image: string): void {
        this.cache.set(image, true);
    }

    has(image: string): Promise<boolean> {
        return this.refresh().then((): boolean =>
            this.cache.get(image) === undefined ? false : true
        );
    }

    refresh(): Promise<void> {
        return readdir(OUTPUT_DIR).then((images: string[]): void => {
            if (images.length === 0) {
                this.cache.clear();
                return;
            }

            if (images.length !== this.size) {
                this.cache.clear();
                for (const image of images) {
                    this.store(image);
                }
            }
        });
    }
}

export default ImageCache;
