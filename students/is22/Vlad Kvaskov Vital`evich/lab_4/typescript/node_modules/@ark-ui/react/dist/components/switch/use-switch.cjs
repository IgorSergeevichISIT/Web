'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const react$1 = require('@zag-js/react');
const zagSwitch = require('@zag-js/switch');
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

const zagSwitch__namespace = /*#__PURE__*/_interopNamespaceDefault(zagSwitch);

const useSwitch = (props = {}) => {
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
    invalid: field?.invalid,
    required: field?.required,
    getRootNode,
    checked: props.defaultChecked,
    ...props
  };
  const context = {
    ...initialContext,
    checked: props.checked,
    onCheckedChange: useEvent.useEvent(props.onCheckedChange, { sync: true })
  };
  const [state, send] = react$1.useMachine(zagSwitch__namespace.machine(initialContext), { context });
  return zagSwitch__namespace.connect(state, send, react$1.normalizeProps);
};

exports.useSwitch = useSwitch;
