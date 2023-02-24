declare global {
  interface Array<T> {
    /**
     * This method multiplies each element of the array by the given number.
     * @param factor The number by which each element of the array is multiplied.
     */
    multiply(factor?: number): number[];
    /**
     * Returns true if all elements match the given predicate.
     * @param predicate A function that takes an element of an array and tests it against a given condition. Returns boolean.
     */
    all(predicate: (value: T) => boolean): boolean;
    /**
     * Returns true if array has at least one element.
     * @param predicate A function that takes an element of an array and tests it against a given condition. Returns boolean.
     */
    any(predicate: (value: T) => boolean): boolean;
    /**
     * Returns a Map containing the elements from the given array indexed by the key returned from keySelector function applied to each element.
     * @param keySelector A function that takes an array element and returns the key.
     */
    associateBy<K extends string | number | symbol>(
      keySelector: (key: T) => K
    ): { [key: string | number | symbol]: T };
    /**
     * Returns an average value of elements in the array.
     */
    average(): number;
    /**
     * Splits this array into several arrays each not exceeding the given size.
     * @param size The size of the arrays into which the original array will be split.
     */
    chunked(size: number): T[][];
    /**
     * Returns a array containing only elements from the given array having distinct keys returned by the given selector function.
     * Among elements of the given array with equal keys, only the first one will be present in the resulting list. The elements in the resulting list are in the same order as they were in the source array.
     * @param selector A function that takes an element of an array and returns key.
     */
    distinctBy<K>(selector?: (key: T) => K): T[];
    /**
     * Returns a array containing only elements matching the given predicate.
     * @param predicate A function that takes an element of an array and tests it against a given condition. Returns boolean.
     */
    customFilter(predicate: (value: T) => boolean): T[];
    /**
     * Returns a array containing only elements matching the given predicate.
     * @param predicate A function that takes the index of an element and the element itself and returns the result of predicate evaluation on the element.
     */
    filterIndexed(predicate: (index: number, value: T) => boolean): T[];
    /**
     * Returns a array containing only elements not matching the given predicate.
     * @param predicate A function that takes an element of an array and tests it against a given condition. Returns boolean.
     */
    filterNot(predicate: (value: T) => boolean): T[];
    /**
     * Returns the first element matching the given predicate, or null if no such element was found.
     * @param predicate A function that takes an element of an array and tests it against a given condition. Returns boolean.
     */
    customFind(predicate: (value: T) => boolean): T | null;
    /**
     * Returns the last element matching the given predicate, or null if no such element was found.
     * @param predicate A function that takes an element of an array and tests it against a given condition. Returns boolean.
     */
    findLast(predicate: (value: T) => boolean): T | null;
    /**
     * Returns a arrayof all elements from all arrays in this array.
     */
    flatten(): T;
    /**
     * Accumulates value starting with initial value and applying operation from left to right to current accumulator value and each element.
     * @param initial Initial accumulator Value.
     * @param operation A function that takes current accumulator value and an element, and calculates the next accumulator value.
     */
    fold<R>(initial: R, operation: (acc: R, value: T) => R): R;
    /**
     * Returns the first element yielding the largest value of the given function.
     * @param selector A function that takes an element of an array and returns a value by which the maximum will be searched.
     */
    maxBy<R>(selector: (value: T) => R): T;
    /**
     * Returns the first element yielding the largest value of the given function.
     * @param selector A function that takes an array element and returns the value by which the minimum will be searched.
     */
    minBy<R>(selector: (value: T) => R): T;
    /**
     * A function that returns the sum of the numbers returned by the selector.
     * @param selector A function that takes an array element and returns a number.
     */
    countBy(selector: (value: T) => number): number;
    /**
     * Groups elements of the original array by the key returned by the given keySelector function applied to
     * each element and returns a object where each group key is associated with a array of corresponding elements.
     * @param keySelector A function that takes an element of an array and returns a key to group the elements of the given array.
     * @param valueTransform A function that converts values to be grouped by key.
     */
    groupBy<K extends string | number | symbol, V>(
      keySelector: (key: T) => K,
      valueTransform?: (value: T) => V
    ): { [key: string | number | symbol]: T[] };
  }
}

export {};
