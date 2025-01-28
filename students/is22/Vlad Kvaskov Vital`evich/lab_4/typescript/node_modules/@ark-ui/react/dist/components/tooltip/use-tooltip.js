'use client';
import { useMachine, normalizeProps } from '@zag-js/react';
import * as tooltip from '@zag-js/tooltip';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';

const useTooltip = (props = {}) => {
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
    onOpenChange: useEvent(props.onOpenChange, { sync: true })
  };
  const [state, send] = useMachine(tooltip.machine(initialContext), { context });
  return tooltip.connect(state, send, normalizeProps);
};

export { useTooltip };
