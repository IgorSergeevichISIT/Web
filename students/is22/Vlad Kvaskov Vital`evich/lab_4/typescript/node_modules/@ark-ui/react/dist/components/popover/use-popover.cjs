'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const popover = require('@zag-js/popover');
const react$1 = require('@zag-js/react');
const react = require('react');
const useEnvironmentContext = require('../../providers/environment/use-environment-context.cjs');
const useLocaleContext = require('../../providers/locale/use-locale-context.cjs');
const useEvent = require('../../utils/use-event.cjs');

function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
  if (e) {
    for (const k in e) {
      if (k !== 'default') {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}

const popover__namespace = /*#__PURE__*/_interopNamespaceDefault(popover);

const usePopover = (props = {}) => {
  const { getRootNode } = useEnvironmentContext.useEnvironmentContext();
  const { dir } = useLocaleContext.useLocaleContext();
  const initialContext = {
    id: react.useId(),
    dir,
    getRootNode,
    open: props.defaultOpen,
    "open.controlled": props.open !== void 0,
    ...props
  };
  const context = {
    ...initialContext,
    open: props.open,
    onOpenChange: useEvent.useEvent(props.onOpenChange, { sync: true })
  };
  const [state, send] = react$1.useMachine(popover__namespace.machine(initialContext), { context });
  return popover__namespace.connect(state, send, react$1.normalizeProps);
};

exports.usePopover = usePopover;
