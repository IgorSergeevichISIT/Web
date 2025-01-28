'use client';
import * as editable from '@zag-js/editable';
import { useMachine, normalizeProps } from '@zag-js/react';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';
import { useFieldContext } from '../field/use-field-context.js';

const useEditable = (props = {}) => {
  const { getRootNode } = useEnvironmentContext();
  const { dir } = useLocaleContext();
  const field = useFieldContext();
  const initialContext = {
    id: useId(),
    ids: {
      label: field?.ids.label,
      input: field?.ids.control
    },
    dir,
    disabled: field?.disabled,
    invalid: field?.invalid,
    readOnly: field?.readOnly,
    required: field?.required,
    getRootNode,
    edit: props.defaultEdit,
    value: props.defaultValue,
    "edit.controlled": props.edit !== void 0,
    ...props
  };
  const context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onEditChange: useEvent(props.onEditChange),
    onValueCommit: useEvent(props.onValueCommit),
    onValueRevert: useEvent(props.onValueRevert)
  };
  const [state, send] = useMachine(editable.machine(initialContext), { context });
  return editable.connect(state, send, normalizeProps);
};

export { useEditable };
