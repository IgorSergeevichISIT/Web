'use client';
import * as pagination from '@zag-js/pagination';
import { useMachine, normalizeProps } from '@zag-js/react';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';

const usePagination = (props) => {
  const { getRootNode } = useEnvironmentContext();
  const { dir } = useLocaleContext();
  const initialContext = {
    id: useId(),
    dir,
    getRootNode,
    page: props.defaultPage,
    ...props
  };
  const context = {
    ...initialContext,
    page: props.page,
    onPageChange: useEvent(props.onPageChange, { sync: true })
  };
  const [state, send] = useMachine(pagination.machine(initialContext), { context });
  return pagination.connect(state, send, normalizeProps);
};

export { usePagination };
