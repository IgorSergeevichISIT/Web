interface DisableTextSelectionOptions<T = MaybeElement> {
    target?: T;
    doc?: Document;
    defer?: boolean;
}
declare function restoreTextSelection(options?: DisableTextSelectionOptions): void;
type MaybeElement = HTMLElement | null | undefined;
type NodeOrFn = MaybeElement | (() => MaybeElement);
declare function disableTextSelection(options?: DisableTextSelectionOptions<NodeOrFn>): () => void;

export { type DisableTextSelectionOptions, disableTextSelection, restoreTextSelection };
