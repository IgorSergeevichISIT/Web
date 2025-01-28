'use client';
import { createSplitProps } from '../../utils/create-split-props.js';

const splitPresenceProps = (props) => createSplitProps()(props, [
  "immediate",
  "lazyMount",
  "onExitComplete",
  "present",
  "unmountOnExit"
]);

export { splitPresenceProps };
