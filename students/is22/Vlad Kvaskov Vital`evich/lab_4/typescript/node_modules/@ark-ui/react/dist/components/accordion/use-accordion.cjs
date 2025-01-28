'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const accordion = require('@zag-js/accordion');
const react$1 = require('@zag-js/react');
const react = require('react');
const useEnvironmentContext = require('../../providers/environment/use-environment-context.cjs');
const useLocaleContext = require('../../providers/locale/use-locale-context.cjs');
const useEvent = require('../../utils/use-event.cjs');

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

const accordion__namespace = /*#__PURE__*/_interopNamespaceDefault(accordion);

const useAccordion = (props = {}) => {
  const { getRootNode } = useEnvironmentContext.useEnvironmentContext();
  const { dir } = useLocaleContext.useLocaleContext();
  const initialContext = {
    id: react.useId(),
    dir,
    getRootNode,
    value: props.defaultValue,
    ...props
  };
  const context = {
    ...initialContext,
    value: props.value,
    onFocusChange: useEvent.useEvent(props.onFocusChange),
    onValueChange: useEvent.useEvent(props.onValueChange)
  };
  const [state, send] = react$1.useMachine(accordion__namespace.machine(initialContext), { context });
  return accordion__namespace.connect(state, send, react$1.normalizeProps);
};

exports.useAccordion = useAccordion;
