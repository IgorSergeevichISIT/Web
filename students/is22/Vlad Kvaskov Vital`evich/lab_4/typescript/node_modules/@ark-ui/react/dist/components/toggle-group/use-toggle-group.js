'use client';
import { useMachine, normalizeProps } from '@zag-js/react';
import * as toggleGroup from '@zag-js/toggle-group';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';

const useToggleGroup = (props = {}) => {
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
    onValueChange: useEvent(props.onValueChange, { sync: true })
  };
  const [state, send] = useMachine(toggleGroup.machine(initialContext), {
    context
  });
  return toggleGroup.connect(state, send, normalizeProps);
};

export { useToggleGroup };
