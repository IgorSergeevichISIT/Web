'use client';
import { useMachine, normalizeProps } from '@zag-js/react';
import * as signaturePad from '@zag-js/signature-pad';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';
import { useFieldContext } from '../field/use-field-context.js';

const useSignaturePad = (props = {}) => {
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
    ...props
  };
  const context = {
    ...initialContext,
    drawing: props.drawing,
    onDraw: useEvent(props.onDraw),
    onDrawEnd: useEvent(props.onDrawEnd)
  };
  const [state, send] = useMachine(signaturePad.machine(initialContext), { context });
  return signaturePad.connect(state, send, normalizeProps);
};

export { useSignaturePad };
