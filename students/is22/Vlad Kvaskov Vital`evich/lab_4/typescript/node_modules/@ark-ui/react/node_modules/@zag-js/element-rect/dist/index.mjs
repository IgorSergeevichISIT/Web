// src/index.ts
var rafId;
var observedElements = /* @__PURE__ */ new Map();
var getRectFn = (el) => el.getBoundingClientRect();
function trackElementRect(el, options) {
  const { scope = "rect", getRect = getRectFn, onChange } = options;
  const loop = getLoopFn({ scope, getRect });
  const data = observedElements.get(el);
  if (!data) {
    observedElements.set(el, {
      rect: {},
      callbacks: [onChange]
    });
    if (observedElements.size === 1) {
      rafId = requestAnimationFrame(loop);
    }
  } else {
    data.callbacks.push(onChange);
    onChange(getRect(el));
  }
  return function unobserve() {
    const data2 = observedElements.get(el);
    if (!data2) return;
    const index = data2.callbacks.indexOf(onChange);
    if (index > -1) {
      data2.callbacks.splice(index, 1);
    }
    if (data2.callbacks.length === 0) {
      observedElements.delete(el);
      if (observedElements.size === 0) {
        cancelAnimationFrame(rafId);
      }
    }
  };
}
function getLoopFn(options) {
  const { scope, getRect } = options;
  const isEqual = getEqualityFn(scope);
  return function loop() {
    const changedRectsData = [];
    observedElements.forEach((data, element) => {
      const newRect = getRect(element);
      if (!isEqual(data.rect, newRect)) {
        data.rect = newRect;
        changedRectsData.push(data);
      }
    });
    changedRectsData.forEach((data) => {
      data.callbacks.forEach((callback) => callback(data.rect));
    });
    rafId = requestAnimationFrame(loop);
  };
}
var isEqualSize = (a, b) => a.width === b.width && a.height === b.height;
var isEqualPosition = (a, b) => a.top === b.top && a.left === b.left;
var isEqualRect = (a, b) => isEqualSize(a, b) && isEqualPosition(a, b);
function getEqualityFn(scope) {
  if (scope === "size") return isEqualSize;
  if (scope === "position") return isEqualPosition;
  return isEqualRect;
}

export { trackElementRect };
