/**
 * Performance utilities for frame rate limiting and monitoring
 */

/**
 * Creates a frame rate limiter that throttles requestAnimationFrame
 * @param {number} targetFPS - Target frames per second (30 or 60 recommended)
 * @returns {Function} - Throttled animation function
 */
export function createFrameLimiter(targetFPS = 60) {
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    return (callback) => {
        const now = performance.now();
        const elapsed = now - lastFrameTime;

        if (elapsed >= frameInterval) {
            lastFrameTime = now - (elapsed % frameInterval);
            callback(now);
        }
    };
}

/**
 * FPS Monitor for performance tracking
 */
export class FPSMonitor {
    constructor() {
        this.frames = [];
        this.lastTime = performance.now();
    }

    tick() {
        const now = performance.now();
        const delta = now - this.lastTime;
        this.lastTime = now;

        this.frames.push(delta);
        if (this.frames.length > 60) {
            this.frames.shift();
        }
    }

    getFPS() {
        if (this.frames.length === 0) return 0;
        const avgDelta = this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
        return Math.round(1000 / avgDelta);
    }

    reset() {
        this.frames = [];
        this.lastTime = performance.now();
    }
}

/**
 * Object pool for particle reuse to reduce GC pressure
 */
export class ObjectPool {
    constructor(createFn, resetFn, initialSize = 50) {
        this.createFn = createFn;
        this.resetFn = resetFn;
        this.pool = [];
        this.active = [];

        // Pre-populate pool
        for (let i = 0; i < initialSize; i++) {
            this.pool.push(this.createFn());
        }
    }

    acquire() {
        let obj;
        if (this.pool.length > 0) {
            obj = this.pool.pop();
        } else {
            obj = this.createFn();
        }
        this.resetFn(obj);
        this.active.push(obj);
        return obj;
    }

    release(obj) {
        const index = this.active.indexOf(obj);
        if (index > -1) {
            this.active.splice(index, 1);
            this.pool.push(obj);
        }
    }

    releaseAll() {
        this.pool.push(...this.active);
        this.active = [];
    }

    getActiveCount() {
        return this.active.length;
    }

    getPoolSize() {
        return this.pool.length;
    }
}
