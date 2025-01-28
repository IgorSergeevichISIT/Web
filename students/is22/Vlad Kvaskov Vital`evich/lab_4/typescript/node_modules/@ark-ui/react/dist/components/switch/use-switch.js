'use client';
import { useMachine, normalizeProps } from '@zag-js/react';
import * as zagSwitch from '@zag-js/switch';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';
import { useFieldContext } from '../field/use-field-context.js';

const useSwitch = (props = {}) => {
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
  const [state, send] = useMachine(zagSwitch.machine(initialContext), { context });
  return zagSwitch.connect(state, send, normalizeProps);
};

export { useSwitch };
