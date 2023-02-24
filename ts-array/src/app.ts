function customPush<T>(element: T, arr: T[]): T[] {
  if (!arr) {
    return [element];
  }
  const length = arr.length;
  const newArr = new Array<T>(length + 1);
  for (let i = 0; i < length; i++) {
    newArr[i] = arr[i];
  }
  newArr[length] = element;
  return newArr;
}

Array.prototype.multiply = function (factor: number = 10): number[] {
  for (let i of this)
    if (isNaN(+i))
      throw new Error(
        "One or more array elements are not a number and cannot be cast to a number type."
      );
  for (let i = 0; i < this.length; i++) this[i] = this[i] * factor;
  return this;
};

Array.prototype.all = function <T>(predicate: (value: T) => boolean): boolean {
  try {
    for (let i of this) if (!predicate(i)) throw new Error();
  } catch (err) {
    return false;
  }
  return true;
};

Array.prototype.any = function <T>(predicate: (value: T) => boolean): boolean {
  try {
    for (let i of this) if (predicate(i)) throw new Error();
  } catch (err) {
    return true;
  }
  return false;
};

type associateResult<T> = {
  [key: string | number | symbol]: T;
};
Array.prototype.associateBy = function <K extends string | number | symbol, T>(
  keySelector: (key: T) => K
): associateResult<T> {
  let keySel = keySelector(this[0]);
  let result: associateResult<T> = { [keySel]: this[0] };
  if (this.length === 1) {
    return result;
  }
  for (let i = 1; i < this.length; i++) {
    keySel = keySelector(this[i]);
    result[keySel] = this[i];
  }
  return result;
};

Array.prototype.average = function (): number {
  let result: number = 0;
  for (let i of this)
    if (isNaN(+i))
      throw new Error(
        "One or more array elements are not a number and cannot be cast to a number type."
      );
  for (let i of this) result += +i;
  return result / this.length;
};

Array.prototype.chunked = function <T>(size: number): T[][] {
  const length = Math.ceil(this.length / size);
  const result = new Array<T[]>(length);
  let index = 0;
  let counter = 0;
  for (let i of this) {
    result[index] = customPush(i, result[index]);
    counter++;
    if (counter === size) {
      index++;
      counter = 0;
    }
  }
  return result;
};

Array.prototype.distinctBy = function <T, K>(selector: (key: T) => K): T[] {
  let result = new Array<T>();
  let selectorArr = new Array<K>();
  for (let i of this) {
    let key: K;
    if (!selector) key = i;
    else key = selector(i);
    const ifExist = (item: K): boolean => {
      try {
        for (let i of selectorArr) {
          if (i === item) throw new Error();
        }
      } catch (err) {
        return true;
      }
      return false;
    };
    if (!ifExist(key)) {
      selectorArr = customPush(key, selectorArr);
      result = customPush(i, result);
    }
  }
  return result;
};

Array.prototype.customFilter = function <T>(
  predicate: (value: T) => boolean
): T[] {
  let result = new Array<T>();
  for (let i of this) {
    if (predicate(i)) {
      result = customPush(i, result);
    }
  }
  return result;
};

Array.prototype.filterIndexed = function <T>(
  predicate: (index: number, value: T) => boolean
): T[] {
  let result = new Array<T>();
  for (let i = 0; i < this.length; i++) {
    if (predicate(i, this[i])) {
      result = customPush(this[i], result);
    }
  }
  return result;
};

Array.prototype.filterNot = function <T>(
  predicate: (value: T) => boolean
): T[] {
  let result = new Array<T>();
  for (let i of this) {
    if (!predicate(i)) {
      result = customPush(i, result);
    }
  }
  return result;
};

Array.prototype.customFind = function <T>(
  predicate: (value: T) => boolean
): T | null {
  let result: T | null = null;
  for (let i of this) {
    if (predicate(i)) {
      result = i;
      break;
    }
  }
  return result;
};

Array.prototype.findLast = function <T>(
  predicate: (value: T) => boolean
): T | null {
  let result: T | null = null;
  for (let i of this) {
    if (predicate(i)) {
      result = i;
    }
  }
  return result;
};

Array.prototype.flatten = function <T>(): T[] {
  for (let i of this) {
    if (!(i instanceof Array))
      throw new Error("One or more elements is not an array.");
  }
  let result = new Array<T>();
  for (let i of this) {
    for (let el of i) {
      result = customPush(el, result);
    }
  }
  return result;
};

Array.prototype.fold = function <T, R>(
  initial: R,
  operation: (acc: R, value: T) => R
): R {
  if (this.length === 0) {
    return initial;
  }
  let result: R = initial;
  for (let i of this) {
    result = operation(result, i);
  }
  return result;
};

Array.prototype.maxBy = function <T, R>(selector: (value: T) => R): T {
  if (this.length === 1) {
    return this[0];
  }
  let result: T = this[0];
  let maxValue: R = selector(this[0]);
  for (let i of this) {
    if (maxValue < selector(i)) {
      result = i;
    }
  }
  return result;
};

Array.prototype.minBy = function <T, R>(selector: (value: T) => R): T {
  if (this.length === 1) {
    return this[0];
  }
  let result: T = this[0];
  let minValue: R = selector(this[0]);
  for (let i of this) {
    if (minValue > selector(i)) {
      result = i;
    }
  }
  return result;
};

Array.prototype.countBy = function <T>(selector: (value: T) => number): number {
  let result = 0;
  for (let i of this) {
    result += selector(i);
  }
  return result;
};

type groupResult<T> = {
  [key: string | number | symbol]: T[];
};
Array.prototype.groupBy = function <K extends string | number | symbol, V, T>(
  keySelector: (key: T) => K,
  valueTransform?: (value: T) => V
): groupResult<T> {
  let item = this[0];
  if (valueTransform) item = valueTransform(item);
  let keySel = keySelector(this[0]);
  let result: groupResult<T> = { [keySel]: [item] };
  if (this.length === 1) return result;

  for (let i = 1; i < this.length; i++) {
    keySel = keySelector(this[i]);
    if (valueTransform) {
      item = valueTransform(this[i]);
    } else {
      item = this[i];
    }

    result[keySel] = customPush<T>(item, result[keySel]);
  }
  return result;
};
