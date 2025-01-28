'use client';
import * as checkbox from '@zag-js/checkbox';
import { mergeProps, useMachine, normalizeProps } from '@zag-js/react';
import { useMemo, useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';
import { useFieldContext } from '../field/use-field-context.js';
import { useCheckboxGroupContext } from './use-checkbox-group-context.js';

const useCheckbox = (ownProps = {}) => {
  const checkboxGroup = useCheckboxGroupContext();
  const field = useFieldContext();
  const props = useMemo(() => {
    return mergeProps(ownProps, checkboxGroup?.getItemProps({ value: ownProps.value }) ?? {});
  }, [ownProps, checkboxGroup]);
  const { getRootNode } = useEnvironmentContext();
  const { dir } = useLocaleContext();
  const initialContext = {
    id: useId(),
    ids: {
      label: field?.ids.label,
      hiddenInput: field?.ids.control
    },
    dir,
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    invalid: field?.invalid,
    required: field?.required,
    getRootNode,
    checked: props.defaultChecked,
    ...props
  };
  const context = {
    ...initialContext,
    checked: props.checked,
    onCheckedChange: useEvent(props.onCheckedChange, { sync: true })
  };
  const [state, send] = useMachine(checkbox.machine(initialContext), { context });
  return checkbox.connect(state, send, normalizeProps);
};

export { useCheckbox };
