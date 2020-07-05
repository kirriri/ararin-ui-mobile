export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const isObject = val => {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
  };