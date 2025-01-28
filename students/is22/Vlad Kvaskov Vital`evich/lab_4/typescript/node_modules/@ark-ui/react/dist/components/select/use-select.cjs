'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const react$1 = require('@zag-js/react');
const select = require('@zag-js/select');
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

const select__namespace = /*#__PURE__*/_interopNamespaceDefault(select);

const useSelect = (props) => {
  const { collection, ...selectProps } = props;
  const locale = useLocaleContext.useLocaleContext();
  const environment = useEnvironmentContext.useEnvironmentContext();
  const field = useFieldContext.useFieldContext();
  const initialContext = {
    id: react.useId(),
    ids: {
      label: field?.ids.label,
      hiddenSelect: field?.ids.control
    },
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    invalid: field?.invalid,
    required: field?.required,
    dir: locale.dir,
    getRootNode: environment.getRootNode,
    collection,
    open: props.defaultOpen,
    value: props.defaultValue,
    "open.controlled": props.open !== void 0,
    ...selectProps
  };
  const context = (() => {
    const { collection: _, ...restProps } = initialContext;
    return {
      ...restProps,
      value: props.value,
      onValueChange: useEvent.useEvent(props.onValueChange, { sync: true }),
      onHighlightChange: useEvent.useEvent(props.onHighlightChange),
      onOpenChange: useEvent.useEvent(props.onOpenChange)
    };
  })();
  const [state, send, service] = react$1.useMachine(select__namespace.machine(initialContext), {
    context
  });
  react.useEffect(() => {
    service.setContext({ collection });
  }, [collection]);
  return select__namespace.connect(state, send, react$1.normalizeProps);
};

exports.useSelect = useSelect;
