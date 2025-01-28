'use client';
import { dataAttr } from '@zag-js/dom-query';
import { useControllableState } from '../../utils/use-controllable-state.js';
import { parts } from './toggle.anatomy.js';

function useToggle(props) {
  const { defaultPressed, pressed, onPressedChange, disabled } = props;
  const [pressedState, setPressedState] = useControllableState({
    defaultValue: !!defaultPressed,
    value: pressed,
    onChange: onPressedChange
  });
  return {
    pressed: pressedState,
    disabled: !!disabled,
    setPressed: setPressedState,
    getRootProps() {
      return {
        ...parts.root.attrs,
        type: "button",
        disabled,
        "aria-pressed": pressedState,
        "data-state": pressedState ? "on" : "off",
        "data-pressed": dataAttr(pressedState),
        "data-disabled": dataAttr(disabled),
        onClick(event) {
          if (event.defaultPrevented) return;
          if (disabled) return;
          setPressedState(!pressedState);
        }
      };
    },
    getIndicatorProps() {
      return {
        ...parts.indicator.attrs,
        "data-disabled": dataAttr(disabled),
        "data-pressed": dataAttr(pressedState),
        "data-state": pressedState ? "on" : "off"
      };
    }
  };
}

export { useToggle };
