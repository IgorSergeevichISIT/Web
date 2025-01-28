'use client';
import * as rating from '@zag-js/rating-group';
import { useMachine, normalizeProps } from '@zag-js/react';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';
import { useFieldContext } from '../field/use-field-context.js';

const useRatingGroup = (props = {}) => {
  const { getRootNode } = useEnvironmentContext();
  const { dir } = useLocaleContext();
  const field = useFieldContext();
  const initialContext = {
    id: useId(),
    ids: {
      label: field?.ids.label,
      hiddenInput: field?.ids.control
    },
    dir,
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    required: field?.required,
    getRootNode,
    value: props.defaultValue,
    ...props
  };
  const context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onHoverChange: useEvent(props.onHoverChange)
  };
  const [state, send] = useMachine(rating.machine(initialContext), {
    context
  });
  return rating.connect(state, send, normalizeProps);
};

export { useRatingGroup };
