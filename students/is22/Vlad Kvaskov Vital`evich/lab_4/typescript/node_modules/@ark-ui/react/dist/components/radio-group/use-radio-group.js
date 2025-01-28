'use client';
import * as radio from '@zag-js/radio-group';
import { useMachine, normalizeProps } from '@zag-js/react';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';

const useRadioGroup = (props = {}) => {
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
  const [state, send] = useMachine(radio.machine(initialContext), {
    context
  });
  return radio.connect(state, send, normalizeProps);
};

export { useRadioGroup };
