export interface Identifiable<K> {
    id: K;
}
export class MemoryRegistry<K extends string | number, T extends Identifiable<K>> {
    public registry = new Map<K, T>();
    public save(item: T): void {
        this.registry.set(item.id, item);
    }
    public fetch(key: K): T | undefined {
        return this.registry.get(key);

    }
    public has(key: K): boolean {
        return this.registry.has(key);
    }
    public clear(): void {
        this.registry.clear();
    }
}
export function debounce<A extends unknown[], R>(
    callback: (...arg: A) => R,
    delay: number
): (...args: A) => void {
    let timerId: ReturnType<typeof setTimeout> | null = null;
    return (...args: A): void => {
        if (timerId !== null) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}

export function memoize<T extends string | number, R>(fn: (arg: T) => R): (arg: T) => R {
  const cache = new Map<T, R>();
  return (arg: T): R => {
    if (cache.has(arg)) {
      return cache.get(arg) as R;
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}
export const formatUSD = memoize((amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
});