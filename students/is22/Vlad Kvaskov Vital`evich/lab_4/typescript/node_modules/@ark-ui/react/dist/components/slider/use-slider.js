'use client';
import { useMachine, normalizeProps } from '@zag-js/react';
import * as slider from '@zag-js/slider';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';

const useSlider = (props = {}) => {
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
    onValueChangeEnd: useEvent(props.onValueChangeEnd),
    onFocusChange: useEvent(props.onFocusChange)
  };
  const [state, send] = useMachine(slider.machine(initialContext), {
    context
  });
  return slider.connect(state, send, normalizeProps);
};

export { useSlider };
