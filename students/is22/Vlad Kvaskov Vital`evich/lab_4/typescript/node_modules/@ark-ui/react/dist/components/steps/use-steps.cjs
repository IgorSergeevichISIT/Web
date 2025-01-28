'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const react$1 = require('@zag-js/react');
const steps = require('@zag-js/steps');
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

const steps__namespace = /*#__PURE__*/_interopNamespaceDefault(steps);

function useSteps(props = {}) {
  const { getRootNode } = useEnvironmentContext.useEnvironmentContext();
  const { dir } = useLocaleContext.useLocaleContext();
  const initialContext = {
    id: react.useId(),
    dir,
    getRootNode,
    step: props.defaultStep,
    ...props
  };
  const context = {
    ...initialContext,
    step: props.step,
    onStepChange: useEvent.useEvent(props.onStepChange),
    onStepComplete: useEvent.useEvent(props.onStepComplete)
  };
  const [state, send] = react$1.useMachine(steps__namespace.machine(initialContext), {
    context
  });
  return steps__namespace.connect(state, send, react$1.normalizeProps);
}

exports.useSteps = useSteps;
