'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const pinInput = require('@zag-js/pin-input');
const react$1 = require('@zag-js/react');
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

const pinInput__namespace = /*#__PURE__*/_interopNamespaceDefault(pinInput);

const usePinInput = (props = {}) => {
  const { getRootNode } = useEnvironmentContext.useEnvironmentContext();
  const { dir } = useLocaleContext.useLocaleContext();
  const field = useFieldContext.useFieldContext();
  const initialContext = {
    id: react.useId(),
    ids: {
      label: field?.ids.label,
      hiddenInput: field?.ids.control
    },
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    required: field?.required,
    invalid: field?.invalid,
    dir,
    getRootNode,
    value: props.defaultValue,
    ...props
  };
  const context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent.useEvent(props.onValueChange, { sync: true }),
    onValueComplete: useEvent.useEvent(props.onValueComplete),
    onValueInvalid: useEvent.useEvent(props.onValueInvalid)
  };
  const [state, send] = react$1.useMachine(pinInput__namespace.machine(initialContext), { context });
  return pinInput__namespace.connect(state, send, react$1.normalizeProps);
};

exports.usePinInput = usePinInput;
