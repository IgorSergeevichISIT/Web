'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const react$1 = require('@zag-js/react');
const slider = require('@zag-js/slider');
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

const slider__namespace = /*#__PURE__*/_interopNamespaceDefault(slider);

const useSlider = (props = {}) => {
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
    onValueChange: useEvent.useEvent(props.onValueChange, { sync: true }),
    onValueChangeEnd: useEvent.useEvent(props.onValueChangeEnd),
    onFocusChange: useEvent.useEvent(props.onFocusChange)
  };
  const [state, send] = react$1.useMachine(slider__namespace.machine(initialContext), {
    context
  });
  return slider__namespace.connect(state, send, react$1.normalizeProps);
};

exports.useSlider = useSlider;
