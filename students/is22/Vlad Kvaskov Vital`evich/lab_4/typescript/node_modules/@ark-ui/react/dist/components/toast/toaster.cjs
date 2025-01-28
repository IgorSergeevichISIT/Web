'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const react$1 = require('@zag-js/react');
const toast = require('@zag-js/toast');
const react = require('react');
const factory = require('../factory.cjs');
const useToastContext = require('./use-toast-context.cjs');

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

const toast__namespace = /*#__PURE__*/_interopNamespaceDefault(toast);

const Toaster = react.forwardRef((props, ref) => {
  const { toaster, children, ...rest } = props;
  const [state, send] = react$1.useMachine(toaster.machine);
  const placement = state.context.placement;
  const api = toast__namespace.group.connect(state, send, react$1.normalizeProps);
  const toasts = api.getToastsByPlacement(placement);
  const mergedProps = react$1.mergeProps(api.getGroupProps({ placement }), rest);
  return /* @__PURE__ */ jsxRuntime.jsx(factory.ark.div, { ...mergedProps, ref, children: toasts.map((toast2) => /* @__PURE__ */ jsxRuntime.jsx(ToastActor, { value: toast2, children: (ctx) => children(ctx) }, toast2.id)) });
});
Toaster.displayName = "Toaster";
const ToastActor = (props) => {
  const [state, send] = react$1.useActor(props.value);
  const api = toast__namespace.connect(state, send, react$1.normalizeProps);
  return /* @__PURE__ */ jsxRuntime.jsx(useToastContext.ToastProvider, { value: api, children: props.children(state.context) });
};

exports.Toaster = Toaster;
