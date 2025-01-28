'use client';
import * as collapsible from '@zag-js/collapsible';
import { useMachine, normalizeProps } from '@zag-js/react';
import { useRef, useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';

const useCollapsible = (props = {}) => {
  const { lazyMount, unmountOnExit, ...collapsibleProps } = props;
  const wasVisible = useRef(false);
  const { dir } = useLocaleContext();
  const { getRootNode } = useEnvironmentContext();
  const initialContext = {
    id: useId(),
    dir,
    getRootNode,
    open: props.defaultOpen,
    "open.controlled": props.open !== void 0,
    ...collapsibleProps
  };
  const context = {
    ...initialContext,
    open: props.open,
    onOpenChange: useEvent(props.onOpenChange, { sync: true })
  };
  const [state, send] = useMachine(collapsible.machine(initialContext), { context });
  const api = collapsible.connect(state, send, normalizeProps);
  if (api.visible) {
    wasVisible.current = true;
  }
  const isUnmounted = !api.visible && !wasVisible.current && lazyMount || unmountOnExit && !api.visible && wasVisible.current;
  return { ...api, isUnmounted };
};

export { useCollapsible };
