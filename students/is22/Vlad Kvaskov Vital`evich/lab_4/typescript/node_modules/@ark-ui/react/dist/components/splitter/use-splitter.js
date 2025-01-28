'use client';
import { useMachine, normalizeProps } from '@zag-js/react';
import * as splitter from '@zag-js/splitter';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';

const useSplitter = (props = {}) => {
  const { getRootNode } = useEnvironmentContext();
  const { dir } = useLocaleContext();
  const initialContext = {
    id: useId(),
    dir,
    getRootNode,
    size: props.defaultSize,
    ...props
  };
  const context = {
    ...initialContext,
    size: props.size,
    onSizeChange: useEvent(props.onSizeChange, { sync: true }),
    onSizeChangeEnd: useEvent(props.onSizeChangeEnd)
  };
  const [state, send] = useMachine(splitter.machine(initialContext), { context });
  return splitter.connect(state, send, normalizeProps);
};

export { useSplitter };
