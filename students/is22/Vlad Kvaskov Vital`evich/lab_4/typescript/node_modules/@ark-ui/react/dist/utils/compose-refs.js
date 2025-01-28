function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    for (const ref of refs) {
      setRef(ref, node);
    }
  };
}

export { composeRefs };
