'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const dialog = require('@zag-js/dialog');
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

const dialog__namespace = /*#__PURE__*/_interopNamespaceDefault(dialog);

const useDialog = (props = {}) => {
  const { getRootNode } = useEnvironmentContext.useEnvironmentContext();
  const { dir } = useLocaleContext.useLocaleContext();
  const initialContext = {
    id: react.useId(),
    getRootNode,
    dir,
    open: props.defaultOpen,
    "open.controlled": props.open !== void 0,
    ...props
  };
  const context = {
    ...initialContext,
    open: props.open,
    onOpenChange: useEvent.useEvent(props.onOpenChange, { sync: true }),
    onEscapeKeyDown: useEvent.useEvent(props.onEscapeKeyDown),
    onInteractOutside: useEvent.useEvent(props.onInteractOutside)
  };
  const [state, send] = react$1.useMachine(dialog__namespace.machine(initialContext), { context });
  return dialog__namespace.connect(state, send, react$1.normalizeProps);
};

exports.useDialog = useDialog;
