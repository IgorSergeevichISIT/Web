'use client';
import { useMachine, normalizeProps } from '@zag-js/react';
import * as steps from '@zag-js/steps';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';

function useSteps(props = {}) {
  const { getRootNode } = useEnvironmentContext();
  const { dir } = useLocaleContext();
  const initialContext = {
    id: useId(),
    dir,
    getRootNode,
    step: props.defaultStep,
    ...props
  };
  const context = {
    ...initialContext,
    step: props.step,
    onStepChange: useEvent(props.onStepChange),
    onStepComplete: useEvent(props.onStepComplete)
  };
  const [state, send] = useMachine(steps.machine(initialContext), {
    context
  });
  return steps.connect(state, send, normalizeProps);
}

export { useSteps };
