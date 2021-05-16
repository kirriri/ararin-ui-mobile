export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare const isObject: (val: any) => boolean;
