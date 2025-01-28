'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const domQuery = require('@zag-js/dom-query');
const useControllableState = require('../../utils/use-controllable-state.cjs');
const toggle_anatomy = require('./toggle.anatomy.cjs');

function useToggle(props) {
  const { defaultPressed, pressed, onPressedChange, disabled } = props;
  const [pressedState, setPressedState] = useControllableState.useControllableState({
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
        ...toggle_anatomy.parts.root.attrs,
        type: "button",
        disabled,
        "aria-pressed": pressedState,
        "data-state": pressedState ? "on" : "off",
        "data-pressed": domQuery.dataAttr(pressedState),
        "data-disabled": domQuery.dataAttr(disabled),
        onClick(event) {
          if (event.defaultPrevented) return;
          if (disabled) return;
          setPressedState(!pressedState);
        }
      };
    },
    getIndicatorProps() {
      return {
        ...toggle_anatomy.parts.indicator.attrs,
        "data-disabled": domQuery.dataAttr(disabled),
        "data-pressed": domQuery.dataAttr(pressedState),
        "data-state": pressedState ? "on" : "off"
      };
    }
  };
}

exports.useToggle = useToggle;
