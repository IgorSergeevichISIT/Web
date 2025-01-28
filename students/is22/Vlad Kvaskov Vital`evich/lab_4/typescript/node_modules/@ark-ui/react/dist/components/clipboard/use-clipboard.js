'use client';
import * as clipboard from '@zag-js/clipboard';
import { useMachine, normalizeProps } from '@zag-js/react';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';

const useClipboard = (props = {}) => {
  const { getRootNode } = useEnvironmentContext();
  const initialContext = {
    id: useId(),
    getRootNode,
    ...props
  };
  const context = {
    ...initialContext
  };
  const [state, send] = useMachine(clipboard.machine(initialContext), { context });
  return clipboard.connect(state, send, normalizeProps);
};

export { useClipboard };
