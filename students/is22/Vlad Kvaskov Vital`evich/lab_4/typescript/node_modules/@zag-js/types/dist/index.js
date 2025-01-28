'use strict';

// src/prop-types.ts
function createNormalizer(fn) {
  return new Proxy({}, {
    get() {
      return fn;
    }
  });
}

// src/create-props.ts
var createProps = () => (props) => Array.from(new Set(props));

exports.createNormalizer = createNormalizer;
exports.createProps = createProps;
