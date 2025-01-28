'use client';
import { jsx } from 'react/jsx-runtime';
import { mergeProps } from '@zag-js/react';
import { forwardRef } from 'react';
import { ark } from '../factory.js';
import { useTimerContext } from './use-timer-context.js';

const TimerActionTrigger = forwardRef(
  (props, ref) => {
    const timer = useTimerContext();
    const mergedProps = mergeProps(timer.getActionTriggerProps(props), props);
    return /* @__PURE__ */ jsx(ark.button, { ...mergedProps, ref });
  }
);
TimerActionTrigger.displayName = "TimerActionTrigger";

export { TimerActionTrigger };
