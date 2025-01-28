'use client';
import * as dialog from '@zag-js/dialog';
import { useMachine, normalizeProps } from '@zag-js/react';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';

const useDialog = (props = {}) => {
  const { getRootNode } = useEnvironmentContext();
  const { dir } = useLocaleContext();
  const initialContext = {
    id: useId(),
    getRootNode,
    dir,
    open: props.defaultOpen,
    "open.controlled": props.open !== void 0,
    ...props
  };
  const context = {
    ...initialContext,
    open: props.open,
    onOpenChange: useEvent(props.onOpenChange, { sync: true }),
    onEscapeKeyDown: useEvent(props.onEscapeKeyDown),
    onInteractOutside: useEvent(props.onInteractOutside)
  };
  const [state, send] = useMachine(dialog.machine(initialContext), { context });
  return dialog.connect(state, send, normalizeProps);
};

export { useDialog };
