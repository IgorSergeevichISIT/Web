'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const react$1 = require('@zag-js/react');
const timer = require('@zag-js/timer');
const react = require('react');
const useEnvironmentContext = require('../../providers/environment/use-environment-context.cjs');
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

const timer__namespace = /*#__PURE__*/_interopNamespaceDefault(timer);

const useTimer = (props = {}) => {
  const env = useEnvironmentContext.useEnvironmentContext();
  const initialContext = {
    id: react.useId(),
    getRootNode: env.getRootNode,
    ...props
  };
  const context = {
    ...initialContext,
    onComplete: useEvent.useEvent(props.onComplete),
    onTick: useEvent.useEvent(props.onTick)
  };
  const [state, send] = react$1.useMachine(timer__namespace.machine(initialContext), { context });
  return timer__namespace.connect(state, send, react$1.normalizeProps);
};

exports.useTimer = useTimer;
