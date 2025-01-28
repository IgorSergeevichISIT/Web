'use client';
import * as accordion from '@zag-js/accordion';
import { useMachine, normalizeProps } from '@zag-js/react';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';

const useAccordion = (props = {}) => {
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
    onFocusChange: useEvent(props.onFocusChange),
    onValueChange: useEvent(props.onValueChange)
  };
  const [state, send] = useMachine(accordion.machine(initialContext), { context });
  return accordion.connect(state, send, normalizeProps);
};

export { useAccordion };
