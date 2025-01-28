'use client';
import { jsx } from 'react/jsx-runtime';
import { mergeProps } from '@zag-js/react';
import { forwardRef } from 'react';
import { createSplitProps } from '../../utils/create-split-props.js';
import { ark } from '../factory.js';
import { useMenuContext } from './use-menu-context.js';
import { MenuItemProvider } from './use-menu-item-context.js';

const MenuItem = forwardRef((props, ref) => {
  const [itemProps, localProps] = createSplitProps()(props, [
    "closeOnSelect",
    "disabled",
    "value",
    "valueText"
  ]);
  const menu = useMenuContext();
  const mergedProps = mergeProps(menu.getItemProps(itemProps), localProps);
  const itemState = menu.getItemState(itemProps);
  return /* @__PURE__ */ jsx(MenuItemProvider, { value: itemState, children: /* @__PURE__ */ jsx(ark.div, { ...mergedProps, ref }) });
});
MenuItem.displayName = "MenuItem";

export { MenuItem };
