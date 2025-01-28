'use client';
import * as avatar from '@zag-js/avatar';
import { useMachine, normalizeProps } from '@zag-js/react';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';

const useAvatar = (props = {}) => {
  const { getRootNode } = useEnvironmentContext();
  const { dir } = useLocaleContext();
  const initialContext = {
    id: useId(),
    dir,
    getRootNode,
    ...props
  };
  const context = {
    ...initialContext,
    onStatusChange: useEvent(props.onStatusChange)
  };
  const [state, send] = useMachine(avatar.machine(initialContext), { context });
  return avatar.connect(state, send, normalizeProps);
};

export { useAvatar };
