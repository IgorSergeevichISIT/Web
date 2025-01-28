'use client';
import { useMachine, normalizeProps } from '@zag-js/react';
import * as timePicker from '@zag-js/time-picker';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';

const useTimePicker = (props = {}) => {
  const { getRootNode } = useEnvironmentContext();
  const { dir } = useLocaleContext();
  const initialContext = {
    id: useId(),
    dir,
    getRootNode,
    open: props.defaultOpen,
    "open.controlled": props.open !== void 0,
    value: props.defaultValue,
    ...props
  };
  const context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange),
    onFocusChange: useEvent(props.onFocusChange),
    onOpenChange: useEvent(props.onOpenChange)
  };
  const [state, send] = useMachine(timePicker.machine(initialContext), { context });
  return timePicker.connect(state, send, normalizeProps);
};

export { useTimePicker };
