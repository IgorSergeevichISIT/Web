'use client';
import { useMachine, normalizeProps } from '@zag-js/react';
import * as tabs from '@zag-js/tabs';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';

const useTabs = (props = {}) => {
  const { getRootNode } = useEnvironmentContext();
  const { dir } = useLocaleContext();
  const initialContext = {
    id: useId(),
    dir,
    getRootNode,
    value: props.defaultValue,
    ...props
  };
  const context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onFocusChange: useEvent(props.onFocusChange)
  };
  const [state, send] = useMachine(tabs.machine(initialContext), { context });
  return tabs.connect(state, send, normalizeProps);
};

export { useTabs };
