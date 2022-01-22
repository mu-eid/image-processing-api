import { readdir } from 'fs/promises';
import { OUTPUT_DIR } from '../resize/utils';

class ImageCache {
    private cache = new Map<string, boolean>();
    constructor() {
        readdir(OUTPUT_DIR).then((storedImages) =>
            storedImages.map((image) => this.store(image))
        );
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
        return this.refresh().then(() =>
            this.cache.get(image) === undefined ? false : true
        );
    }

    refresh(): Promise<void> {
        return readdir(OUTPUT_DIR).then((storedImages): void => {
            if (storedImages.length === 0) {
                this.cache.clear();
                return;
            }

            if (storedImages.length !== this.size) {
                this.cache.clear();
                for (const image of storedImages) {
                    this.store(image);
                }
            }
        });
    }
}

export default ImageCache;
