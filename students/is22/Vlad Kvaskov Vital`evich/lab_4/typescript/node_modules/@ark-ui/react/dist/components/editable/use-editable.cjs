'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const editable = require('@zag-js/editable');
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

const editable__namespace = /*#__PURE__*/_interopNamespaceDefault(editable);

const useEditable = (props = {}) => {
  const { getRootNode } = useEnvironmentContext.useEnvironmentContext();
  const { dir } = useLocaleContext.useLocaleContext();
  const field = useFieldContext.useFieldContext();
  const initialContext = {
    id: react.useId(),
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
    onValueChange: useEvent.useEvent(props.onValueChange, { sync: true }),
    onEditChange: useEvent.useEvent(props.onEditChange),
    onValueCommit: useEvent.useEvent(props.onValueCommit),
    onValueRevert: useEvent.useEvent(props.onValueRevert)
  };
  const [state, send] = react$1.useMachine(editable__namespace.machine(initialContext), { context });
  return editable__namespace.connect(state, send, react$1.normalizeProps);
};

exports.useEditable = useEditable;
