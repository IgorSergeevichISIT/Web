'use client';
import { useMachine, normalizeProps } from '@zag-js/react';
import * as timer from '@zag-js/timer';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useEvent } from '../../utils/use-event.js';

const useTimer = (props = {}) => {
  const env = useEnvironmentContext();
  const initialContext = {
    id: useId(),
    getRootNode: env.getRootNode,
    ...props
  };
  const context = {
    ...initialContext,
    onComplete: useEvent(props.onComplete),
    onTick: useEvent(props.onTick)
  };
  const [state, send] = useMachine(timer.machine(initialContext), { context });
  return timer.connect(state, send, normalizeProps);
};

export { useTimer };
