'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const react = require('@zag-js/react');
const toast = require('@zag-js/toast');

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

const toast__namespace = /*#__PURE__*/_interopNamespaceDefault(toast);

const createToaster = (props) => {
  const machine = toast__namespace.group.machine({ id: "1", ...props });
  const api = toast__namespace.group.connect(machine, machine.send, react.normalizeProps);
  return { ...api, machine };
};

exports.createToaster = createToaster;
