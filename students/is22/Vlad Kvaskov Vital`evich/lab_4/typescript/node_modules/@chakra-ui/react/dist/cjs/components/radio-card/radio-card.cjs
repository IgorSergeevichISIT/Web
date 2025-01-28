"use strict";
"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var radioGroup = require('@ark-ui/react/radio-group');
var React = require('react');
var createSlotRecipeContext = require('../../styled-system/create-slot-recipe-context.cjs');
var factory = require('../../styled-system/factory.cjs');
var radiomark = require('../radiomark/radiomark.cjs');

const {
  withProvider,
  withContext,
  useStyles: useRadioCardStyles,
  PropsProvider
} = createSlotRecipeContext.createSlotRecipeContext({ key: "radioCard" });
const RadioCardRootProvider = withProvider(radioGroup.RadioGroup.RootProvider, "root", { forwardAsChild: true });
const RadioCardRoot = withProvider(
  radioGroup.RadioGroup.Root,
  "root",
  { forwardAsChild: true }
);
const RadioCardPropsProvider = PropsProvider;
const RadioCardLabel = withContext(
  radioGroup.RadioGroup.Label,
  "label",
  { forwardAsChild: true }
);
const RadioCardItem = withContext(
  radioGroup.RadioGroup.Item,
  "item",
  { forwardAsChild: true }
);
const RadioCardItemText = withContext(radioGroup.RadioGroup.ItemText, "itemText", { forwardAsChild: true });
const RadioCardItemDescription = withContext("div", "itemDescription", { forwardAsChild: true });
const RadioCardItemControl = withContext(radioGroup.RadioGroup.ItemControl, "itemControl", { forwardAsChild: true });
const RadioCardItemContent = withContext("div", "itemContent");
const RadioCardItemAddon = withContext("div", "itemAddon");
const RadioCardItemIndicator = React.forwardRef(function RadioGroupItemIndicator(props, ref) {
  const { checked, ...rest } = props;
  const styles = useRadioCardStyles();
  const itemContext = radioGroup.useRadioGroupItemContext();
  if (checked && itemContext.checked) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      factory.chakra.span,
      {
        ref,
        asChild: true,
        ...rest,
        css: [styles["itemIndicator"], props.css],
        children: checked
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    radiomark.Radiomark,
    {
      ref,
      unstyled: true,
      ...props,
      checked: itemContext.checked,
      disabled: itemContext.disabled,
      css: [styles["itemIndicator"], props.css]
    }
  );
});
const RadioCardContext = radioGroup.RadioGroup.Context;
const RadioCardItemContext = radioGroup.RadioGroup.ItemContext;
const RadioCardItemHiddenInput = radioGroup.RadioGroup.ItemHiddenInput;

exports.RadioCardContext = RadioCardContext;
exports.RadioCardItem = RadioCardItem;
exports.RadioCardItemAddon = RadioCardItemAddon;
exports.RadioCardItemContent = RadioCardItemContent;
exports.RadioCardItemContext = RadioCardItemContext;
exports.RadioCardItemControl = RadioCardItemControl;
exports.RadioCardItemDescription = RadioCardItemDescription;
exports.RadioCardItemHiddenInput = RadioCardItemHiddenInput;
exports.RadioCardItemIndicator = RadioCardItemIndicator;
exports.RadioCardItemText = RadioCardItemText;
exports.RadioCardLabel = RadioCardLabel;
exports.RadioCardPropsProvider = RadioCardPropsProvider;
exports.RadioCardRoot = RadioCardRoot;
exports.RadioCardRootProvider = RadioCardRootProvider;
exports.useRadioCardStyles = useRadioCardStyles;
