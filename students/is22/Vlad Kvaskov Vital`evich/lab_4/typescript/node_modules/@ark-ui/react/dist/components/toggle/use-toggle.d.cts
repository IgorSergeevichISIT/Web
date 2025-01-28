export interface UseToggleProps {
    /**
     * Whether the toggle is disabled.
     */
    disabled?: boolean;
    /**
     * The default pressed state of the toggle.
     */
    defaultPressed?: boolean;
    /**
     * The pressed state of the toggle.
     */
    pressed?: boolean;
    /**
     * Event handler called when the pressed state of the toggle changes.
     */
    onPressedChange?: (pressed: boolean) => void;
}
export interface UseToggleReturn {
    /**
     * Whether the toggle is pressed.
     */
    pressed: boolean;
    /**
     * Whether the toggle is disabled.
     */
    disabled: boolean;
    /**
     * Sets the pressed state of the toggle.
     */
    setPressed(pressed: boolean): void;
    getRootProps(): React.ComponentProps<'button'>;
    getIndicatorProps(): React.ComponentProps<'div'>;
}
export declare function useToggle(props: UseToggleProps): UseToggleReturn;
