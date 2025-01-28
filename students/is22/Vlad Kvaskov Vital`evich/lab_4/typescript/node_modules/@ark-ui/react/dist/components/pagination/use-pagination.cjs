'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const pagination = require('@zag-js/pagination');
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

const pagination__namespace = /*#__PURE__*/_interopNamespaceDefault(pagination);

const usePagination = (props) => {
  const { getRootNode } = useEnvironmentContext.useEnvironmentContext();
  const { dir } = useLocaleContext.useLocaleContext();
  const initialContext = {
    id: react.useId(),
    dir,
    getRootNode,
    page: props.defaultPage,
    ...props
  };
  const context = {
    ...initialContext,
    page: props.page,
    onPageChange: useEvent.useEvent(props.onPageChange, { sync: true })
  };
  const [state, send] = react$1.useMachine(pagination__namespace.machine(initialContext), { context });
  return pagination__namespace.connect(state, send, react$1.normalizeProps);
};

exports.usePagination = usePagination;
