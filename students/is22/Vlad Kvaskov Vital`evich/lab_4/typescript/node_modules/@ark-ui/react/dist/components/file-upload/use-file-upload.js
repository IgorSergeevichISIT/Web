'use client';
import * as fileUpload from '@zag-js/file-upload';
import { useMachine, normalizeProps } from '@zag-js/react';
import { useId } from 'react';
import { useEnvironmentContext } from '../../providers/environment/use-environment-context.js';
import { useLocaleContext } from '../../providers/locale/use-locale-context.js';
import { useEvent } from '../../utils/use-event.js';
import { useFieldContext } from '../field/use-field-context.js';

const useFileUpload = (props = {}) => {
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
    required: field?.required,
    invalid: field?.invalid,
    getRootNode,
    ...props
  };
  const context = {
    ...initialContext,
    onFileAccept: useEvent(props.onFileAccept),
    onFileReject: useEvent(props.onFileReject),
    onFileChange: useEvent(props.onFileChange, { sync: true })
  };
  const [state, send] = useMachine(fileUpload.machine(initialContext), { context });
  return fileUpload.connect(state, send, normalizeProps);
};

export { useFileUpload };
