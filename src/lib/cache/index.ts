import { readdir } from 'fs/promises';
import { OUTPUT_DIR } from '../resize/utils';

class ImageCache {
    private cache = new Map<string, boolean>();
    constructor() {
        readdir(OUTPUT_DIR).then((images) =>
            images.map((image) => this.cache.set(image, true))
        );
    }

    store(image: string): void {
        this.cache.set(image, true);
    }

    has(image: string): boolean {
        return this.cache.get(image) ? true : false;
    }

    get size(): number {
        return this.cache.size;
    }

    isEmpty(): boolean {
        return this.size === 0;
    }
}

export default ImageCache;
