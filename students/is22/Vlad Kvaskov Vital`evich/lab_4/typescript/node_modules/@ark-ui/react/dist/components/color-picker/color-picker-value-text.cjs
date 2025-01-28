'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const react$1 = require('@zag-js/react');
const react = require('react');
const factory = require('../factory.cjs');
const useColorPickerContext = require('./use-color-picker-context.cjs');

const ColorPickerValueText = react.forwardRef(
  (props, ref) => {
    const { children, ...localprops } = props;
    const colorPicker = useColorPickerContext.useColorPickerContext();
    const mergedProps = react$1.mergeProps(colorPicker.getValueTextProps(), localprops);
    return /* @__PURE__ */ jsxRuntime.jsx(factory.ark.span, { ...mergedProps, ref, children: props.children || colorPicker.valueAsString });
  }
);
ColorPickerValueText.displayName = "ColorPickerValueText";

exports.ColorPickerValueText = ColorPickerValueText;
