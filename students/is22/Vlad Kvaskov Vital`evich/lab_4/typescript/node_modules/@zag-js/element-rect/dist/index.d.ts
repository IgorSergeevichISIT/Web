interface Rect {
    top: number;
    left: number;
    width: number;
    height: number;
}
type TrackScope = "size" | "position" | "rect";
type ElementRectOptions = {
    onChange: (rect: Rect) => void;
    scope?: TrackScope;
    getRect?: (el: HTMLElement) => Rect;
};
declare function trackElementRect(el: HTMLElement, options: ElementRectOptions): () => void;

export { type ElementRectOptions, trackElementRect };
