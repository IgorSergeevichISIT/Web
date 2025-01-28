import { UseCollapsibleProps } from './use-collapsible';
export declare const splitCollapsibleProps: <T extends UseCollapsibleProps>(props: T) => [UseCollapsibleProps, Omit<T, "open" | "id" | "ids" | "disabled" | "lazyMount" | "unmountOnExit" | "onExitComplete" | "onOpenChange" | "defaultOpen">];
