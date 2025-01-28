'use client';
import { useMachine, normalizeProps } from '@zag-js/react';
import * as select from '@zag-js/select';
import { useId, useEffect } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';
import { useFieldContext } from '../field/use-field-context.js';

const useSelect = (props) => {
  const { collection, ...selectProps } = props;
  const locale = useLocaleContext();
  const environment = useEnvironmentContext();
  const field = useFieldContext();
  const initialContext = {
    id: useId(),
    ids: {
      label: field?.ids.label,
      hiddenSelect: field?.ids.control
    },
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    invalid: field?.invalid,
    required: field?.required,
    dir: locale.dir,
    getRootNode: environment.getRootNode,
    collection,
    open: props.defaultOpen,
    value: props.defaultValue,
    "open.controlled": props.open !== void 0,
    ...selectProps
  };
  const context = (() => {
    const { collection: _, ...restProps } = initialContext;
    return {
      ...restProps,
      value: props.value,
      onValueChange: useEvent(props.onValueChange, { sync: true }),
      onHighlightChange: useEvent(props.onHighlightChange),
      onOpenChange: useEvent(props.onOpenChange)
    };
  })();
  const [state, send, service] = useMachine(select.machine(initialContext), {
    context
  });
  useEffect(() => {
    service.setContext({ collection });
  }, [collection]);
  return select.connect(state, send, normalizeProps);
};

export { useSelect };
