'use client';
import * as menu from '@zag-js/menu';
import { useMachine, normalizeProps } from '@zag-js/react';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';

const useMenu = (props = {}) => {
  const { getRootNode } = useEnvironmentContext();
  const { dir } = useLocaleContext();
  const initialContext = {
    id: useId(),
    dir,
    getRootNode,
    open: props.defaultOpen,
    "open.controlled": props.open !== void 0,
    ...props
  };
  const context = {
    ...initialContext,
    onOpenChange: useEvent(props.onOpenChange),
    onSelect: useEvent(props.onSelect)
  };
  const [state, send, machine] = useMachine(menu.machine(initialContext), { context });
  const api = menu.connect(state, send, normalizeProps);
  return { api, machine };
};

export { useMenu };
