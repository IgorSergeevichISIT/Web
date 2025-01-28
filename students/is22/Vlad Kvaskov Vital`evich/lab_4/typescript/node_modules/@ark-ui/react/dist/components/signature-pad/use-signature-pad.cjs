'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const react$1 = require('@zag-js/react');
const signaturePad = require('@zag-js/signature-pad');
const react = require('react');
const useEnvironmentContext = require('../../providers/environment/use-environment-context.cjs');
const useLocaleContext = require('../../providers/locale/use-locale-context.cjs');
const useEvent = require('../../utils/use-event.cjs');
const useFieldContext = require('../field/use-field-context.cjs');

function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
  if (e) {
    for (const k in e) {
      if (k !== 'default') {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}

const signaturePad__namespace = /*#__PURE__*/_interopNamespaceDefault(signaturePad);

const useSignaturePad = (props = {}) => {
  const { getRootNode } = useEnvironmentContext.useEnvironmentContext();
  const { dir } = useLocaleContext.useLocaleContext();
  const field = useFieldContext.useFieldContext();
  const initialContext = {
    id: react.useId(),
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
    onDraw: useEvent.useEvent(props.onDraw),
    onDrawEnd: useEvent.useEvent(props.onDrawEnd)
  };
  const [state, send] = react$1.useMachine(signaturePad__namespace.machine(initialContext), { context });
  return signaturePad__namespace.connect(state, send, react$1.normalizeProps);
};

exports.useSignaturePad = useSignaturePad;
