type PossibleRef<T> = React.Ref<T | null> | undefined;
export declare function composeRefs<T>(...refs: PossibleRef<T>[]): (node: T | null) => void;
export {};
