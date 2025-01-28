'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const avatar = require('@zag-js/avatar');
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

const avatar__namespace = /*#__PURE__*/_interopNamespaceDefault(avatar);

const useAvatar = (props = {}) => {
  const { getRootNode } = useEnvironmentContext.useEnvironmentContext();
  const { dir } = useLocaleContext.useLocaleContext();
  const initialContext = {
    id: react.useId(),
    dir,
    getRootNode,
    ...props
  };
  const context = {
    ...initialContext,
    onStatusChange: useEvent.useEvent(props.onStatusChange)
  };
  const [state, send] = react$1.useMachine(avatar__namespace.machine(initialContext), { context });
  return avatar__namespace.connect(state, send, react$1.normalizeProps);
};

exports.useAvatar = useAvatar;
