'use strict';

var domQuery = require('@zag-js/dom-query');
var textSelection = require('@zag-js/text-selection');

// src/add-dom-event.ts
var addDomEvent = (target, eventName, handler, options) => {
  const node = typeof target === "function" ? target() : target;
  node?.addEventListener(eventName, handler, options);
  return () => {
    node?.removeEventListener(eventName, handler, options);
  };
};
function isKeyboardClick(e) {
  return e.detail === 0 || e.clientX === 0 && e.clientY === 0;
}
function isPrintableKey(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
function isVirtualPointerEvent(e) {
  return e.width === 0 && e.height === 0 || e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse";
}
function isVirtualClick(e) {
  if (e.mozInputSource === 0 && e.isTrusted) return true;
  return e.detail === 0 && !e.pointerType;
}
var isLeftClick = (e) => e.button === 0;
var isContextMenuEvent = (e) => {
  return e.button === 2 || domQuery.isMac() && e.ctrlKey && e.button === 0;
};
var isModifierKey = (e) => e.ctrlKey || e.altKey || e.metaKey;

// src/queue-before-event.ts
function queueBeforeEvent(element, type, cb) {
  const createTimer = (callback) => {
    const timerId = requestAnimationFrame(callback);
    return () => cancelAnimationFrame(timerId);
  };
  const cancelTimer = createTimer(() => {
    element.removeEventListener(type, callSync, true);
    cb();
  });
  const callSync = () => {
    cancelTimer();
    cb();
  };
  element.addEventListener(type, callSync, { once: true, capture: true });
  return cancelTimer;
}

// src/click-link.ts
function isLinkElement(element) {
  return element?.matches("a[href]") ?? false;
}
function clickIfLink(element) {
  if (!isLinkElement(element)) return;
  const click = () => element.click();
  if (domQuery.isFirefox()) {
    queueBeforeEvent(element, "keyup", click);
  } else {
    queueMicrotask(click);
  }
}

// src/fire-event.ts
function fireCustomEvent(el, type, init) {
  if (!el) return;
  const win = el.ownerDocument.defaultView || window;
  const event = new win.CustomEvent(type, init);
  return el.dispatchEvent(event);
}
function fireBlurEvent(el, init) {
  const win = el.ownerDocument.defaultView || window;
  const event = new win.FocusEvent("blur", init);
  const allowed = el.dispatchEvent(event);
  const bubbleInit = { ...init, bubbles: true };
  el.dispatchEvent(new win.FocusEvent("focusout", bubbleInit));
  return allowed;
}

// src/get-event-key.ts
var keyMap = {
  Up: "ArrowUp",
  Down: "ArrowDown",
  Esc: "Escape",
  " ": "Space",
  ",": "Comma",
  Left: "ArrowLeft",
  Right: "ArrowRight"
};
var rtlKeyMap = {
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft"
};
function getEventKey(event, options = {}) {
  const { dir = "ltr", orientation = "horizontal" } = options;
  let { key } = event;
  key = keyMap[key] ?? key;
  const isRtl = dir === "rtl" && orientation === "horizontal";
  if (isRtl && key in rtlKeyMap) {
    key = rtlKeyMap[key];
  }
  return key;
}

// src/get-event-point.ts
function pointFromTouch(e, type = "client") {
  const point = e.touches[0] || e.changedTouches[0];
  return { x: point[`${type}X`], y: point[`${type}Y`] };
}
function pointFromMouse(point, type = "client") {
  return { x: point[`${type}X`], y: point[`${type}Y`] };
}
var isTouchEvent = (event) => "touches" in event && event.touches.length > 0;
function getEventPoint(event, type = "client") {
  return isTouchEvent(event) ? pointFromTouch(event, type) : pointFromMouse(event, type);
}

// src/get-event-step.ts
var PAGE_KEYS = /* @__PURE__ */ new Set(["PageUp", "PageDown"]);
var ARROW_KEYS = /* @__PURE__ */ new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
function getEventStep(event) {
  if (event.ctrlKey || event.metaKey) {
    return 0.1;
  } else {
    const isPageKey = PAGE_KEYS.has(event.key);
    const isSkipKey = isPageKey || event.shiftKey && ARROW_KEYS.has(event.key);
    return isSkipKey ? 10 : 1;
  }
}

// src/get-native-event.ts
function getNativeEvent(event) {
  return event.nativeEvent ?? event;
}

// src/get-point-value.ts
function clamp(value) {
  return Math.max(0, Math.min(1, value));
}
function getRelativePoint(point, element) {
  const { left, top, width, height } = element.getBoundingClientRect();
  const offset = { x: point.x - left, y: point.y - top };
  const percent = { x: clamp(offset.x / width), y: clamp(offset.y / height) };
  function getPercentValue(options = {}) {
    const { dir = "ltr", orientation = "horizontal", inverted } = options;
    const invertX = typeof inverted === "object" ? inverted.x : inverted;
    const invertY = typeof inverted === "object" ? inverted.y : inverted;
    if (orientation === "horizontal") {
      return dir === "rtl" || invertX ? 1 - percent.x : percent.x;
    }
    return invertY ? 1 - percent.y : percent.y;
  }
  return { offset, percent, getPercentValue };
}

// src/request-pointer-lock.ts
function requestPointerLock(doc, fn) {
  const body = doc.body;
  const supported = "pointerLockElement" in doc || "mozPointerLockElement" in doc;
  const isLocked = () => !!doc.pointerLockElement;
  function onPointerChange() {
    fn?.(isLocked());
  }
  function onPointerError(event) {
    if (isLocked()) fn?.(false);
    console.error("PointerLock error occured:", event);
    doc.exitPointerLock();
  }
  if (!supported) return;
  try {
    body.requestPointerLock();
  } catch {
  }
  const cleanup = [
    addDomEvent(doc, "pointerlockchange", onPointerChange, false),
    addDomEvent(doc, "pointerlockerror", onPointerError, false)
  ];
  return () => {
    cleanup.forEach((cleanup2) => cleanup2());
    doc.exitPointerLock();
  };
}
function trackPointerMove(doc, handlers) {
  const { onPointerMove, onPointerUp } = handlers;
  const history = [];
  const handleMove = (event) => {
    const point = getEventPoint(event);
    history.push({ ...point, timestamp: performance.now() });
    const distance = Math.sqrt(point.x ** 2 + point.y ** 2);
    const moveBuffer = event.pointerType === "touch" ? 10 : 5;
    if (distance < moveBuffer) return;
    if (event.pointerType === "mouse" && event.button === 0) {
      onPointerUp();
      return;
    }
    onPointerMove({ point, event, velocity: getVelocity(history, 0.1) });
  };
  const cleanups = [
    addDomEvent(doc, "pointermove", handleMove, false),
    addDomEvent(doc, "pointerup", onPointerUp, false),
    addDomEvent(doc, "pointercancel", onPointerUp, false),
    addDomEvent(doc, "contextmenu", onPointerUp, false),
    textSelection.disableTextSelection({ doc })
  ];
  return () => {
    cleanups.forEach((cleanup) => cleanup());
    history.length = 0;
  };
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function ms(seconds) {
  return seconds * 1e3;
}
function sec(milliseconds) {
  return milliseconds / 1e3;
}
function getVelocity(history, timeDelta) {
  if (history.length < 2) return { x: 0, y: 0 };
  let i = history.length - 1;
  let timestampedPoint = null;
  const lastPoint = lastDevicePoint(history);
  while (i >= 0) {
    timestampedPoint = history[i];
    if (lastPoint.timestamp - timestampedPoint.timestamp > ms(timeDelta)) {
      break;
    }
    i--;
  }
  if (!timestampedPoint) return { x: 0, y: 0 };
  const time = sec(lastPoint.timestamp - timestampedPoint.timestamp);
  if (time === 0) return { x: 0, y: 0 };
  const currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time,
    y: (lastPoint.y - timestampedPoint.y) / time
  };
  if (currentVelocity.x === Infinity) currentVelocity.x = 0;
  if (currentVelocity.y === Infinity) currentVelocity.y = 0;
  return {
    x: Math.abs(currentVelocity.x),
    y: Math.abs(currentVelocity.y)
  };
}

// src/pipe.ts
var pipe = (...fns) => (arg) => fns.reduce((acc, fn) => fn(acc), arg);
var noop = () => void 0;

// src/track-press.ts
function trackPress(options) {
  const {
    pointerNode,
    keyboardNode = pointerNode,
    onPress,
    onPressStart,
    onPressEnd,
    isValidKey = (e) => e.key === "Enter"
  } = options;
  if (!pointerNode) return noop;
  const win = domQuery.getWindow(pointerNode);
  const doc = domQuery.getDocument(pointerNode);
  let removeStartListeners = noop;
  let removeEndListeners = noop;
  let removeAccessibleListeners = noop;
  const getInfo = (event) => ({
    point: getEventPoint(event),
    event
  });
  function startPress(event) {
    onPressStart?.(getInfo(event));
  }
  function cancelPress(event) {
    onPressEnd?.(getInfo(event));
  }
  const startPointerPress = (startEvent) => {
    removeEndListeners();
    const endPointerPress = (endEvent) => {
      const target = domQuery.getEventTarget(endEvent);
      if (domQuery.contains(pointerNode, target)) {
        onPress?.(getInfo(endEvent));
      } else {
        onPressEnd?.(getInfo(endEvent));
      }
    };
    const removePointerUpListener = addDomEvent(win, "pointerup", endPointerPress, { passive: !onPress });
    const removePointerCancelListener = addDomEvent(win, "pointercancel", cancelPress, { passive: !onPressEnd });
    removeEndListeners = pipe(removePointerUpListener, removePointerCancelListener);
    if (doc.activeElement === keyboardNode && startEvent.pointerType === "mouse") {
      startEvent.preventDefault();
    }
    startPress(startEvent);
  };
  const removePointerListener = addDomEvent(pointerNode, "pointerdown", startPointerPress, { passive: !onPressStart });
  const removeFocusListener = addDomEvent(keyboardNode, "focus", startAccessiblePress);
  removeStartListeners = pipe(removePointerListener, removeFocusListener);
  function startAccessiblePress() {
    const handleKeydown = (keydownEvent) => {
      if (!isValidKey(keydownEvent)) return;
      const handleKeyup = (keyupEvent) => {
        if (!isValidKey(keyupEvent)) return;
        const evt2 = new win.PointerEvent("pointerup");
        const info = getInfo(evt2);
        onPress?.(info);
        onPressEnd?.(info);
      };
      removeEndListeners();
      removeEndListeners = addDomEvent(keyboardNode, "keyup", handleKeyup);
      const evt = new win.PointerEvent("pointerdown");
      startPress(evt);
    };
    const handleBlur = () => {
      const evt = new win.PointerEvent("pointercancel");
      cancelPress(evt);
    };
    const removeKeydownListener = addDomEvent(keyboardNode, "keydown", handleKeydown);
    const removeBlurListener = addDomEvent(keyboardNode, "blur", handleBlur);
    removeAccessibleListeners = pipe(removeKeydownListener, removeBlurListener);
  }
  return function() {
    removeStartListeners();
    removeEndListeners();
    removeAccessibleListeners();
  };
}

// src/track-visual-viewport.ts
function trackVisualViewport(doc, fn) {
  const win = doc?.defaultView || window;
  const onResize = () => {
    fn?.(getViewportSize(win));
  };
  onResize();
  return addDomEvent(win.visualViewport ?? win, "resize", onResize);
}
function getViewportSize(win) {
  return {
    width: win.visualViewport?.width || win.innerWidth,
    height: win.visualViewport?.height || win.innerHeight
  };
}

exports.addDomEvent = addDomEvent;
exports.clickIfLink = clickIfLink;
exports.fireBlurEvent = fireBlurEvent;
exports.fireCustomEvent = fireCustomEvent;
exports.getEventKey = getEventKey;
exports.getEventPoint = getEventPoint;
exports.getEventStep = getEventStep;
exports.getNativeEvent = getNativeEvent;
exports.getRelativePoint = getRelativePoint;
exports.isContextMenuEvent = isContextMenuEvent;
exports.isKeyboardClick = isKeyboardClick;
exports.isLeftClick = isLeftClick;
exports.isModifierKey = isModifierKey;
exports.isPrintableKey = isPrintableKey;
exports.isVirtualClick = isVirtualClick;
exports.isVirtualPointerEvent = isVirtualPointerEvent;
exports.queueBeforeEvent = queueBeforeEvent;
exports.requestPointerLock = requestPointerLock;
exports.trackPointerMove = trackPointerMove;
exports.trackPress = trackPress;
exports.trackVisualViewport = trackVisualViewport;
