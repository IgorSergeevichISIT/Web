'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const accordion = require('@zag-js/accordion');
const react$1 = require('@zag-js/react');
const react = require('react');
const useAccordionContext = require('./use-accordion-context.cjs');
const useAccordionItemContext = require('./use-accordion-item-context.cjs');
const collapsibleRoot = require('../collapsible/collapsible-root.cjs');
require('@zag-js/color-picker');
require('@zag-js/date-picker');
require('@internationalized/date');
const renderStrategy = require('../../utils/render-strategy.cjs');
const useAccordionItemPropsContext = require('./use-accordion-item-props-context.cjs');

const AccordionItem = react.forwardRef((props, ref) => {
  const [itemProps, localProps] = accordion.splitItemProps(props);
  const accordion$1 = useAccordionContext.useAccordionContext();
  const renderStrategy$1 = renderStrategy.useRenderStrategyPropsContext();
  const mergedProps = react$1.mergeProps(accordion$1.getItemProps(itemProps), localProps);
  const item = accordion$1.getItemState(itemProps);
  const itemContentProps = accordion$1.getItemContentProps(itemProps);
  return /* @__PURE__ */ jsxRuntime.jsx(useAccordionItemPropsContext.AccordionItemPropsProvider, { value: itemProps, children: /* @__PURE__ */ jsxRuntime.jsx(useAccordionItemContext.AccordionItemProvider, { value: item, children: /* @__PURE__ */ jsxRuntime.jsx(
    collapsibleRoot.CollapsibleRoot,
    {
      ref,
      open: item.expanded,
      ids: { content: itemContentProps.id },
      ...renderStrategy$1,
      ...mergedProps
    }
  ) }) });
});
AccordionItem.displayName = "AccordionItem";

exports.AccordionItem = AccordionItem;
