'use client';
import { jsx } from 'react/jsx-runtime';
import { useMachine, normalizeProps, mergeProps, useActor } from '@zag-js/react';
import * as toast from '@zag-js/toast';
import { forwardRef } from 'react';
import { ark } from '../factory.js';
import { ToastProvider } from './use-toast-context.js';

const Toaster = forwardRef((props, ref) => {
  const { toaster, children, ...rest } = props;
  const [state, send] = useMachine(toaster.machine);
  const placement = state.context.placement;
  const api = toast.group.connect(state, send, normalizeProps);
  const toasts = api.getToastsByPlacement(placement);
  const mergedProps = mergeProps(api.getGroupProps({ placement }), rest);
  return /* @__PURE__ */ jsx(ark.div, { ...mergedProps, ref, children: toasts.map((toast2) => /* @__PURE__ */ jsx(ToastActor, { value: toast2, children: (ctx) => children(ctx) }, toast2.id)) });
});
Toaster.displayName = "Toaster";
const ToastActor = (props) => {
  const [state, send] = useActor(props.value);
  const api = toast.connect(state, send, normalizeProps);
  return /* @__PURE__ */ jsx(ToastProvider, { value: api, children: props.children(state.context) });
};

export { Toaster };
