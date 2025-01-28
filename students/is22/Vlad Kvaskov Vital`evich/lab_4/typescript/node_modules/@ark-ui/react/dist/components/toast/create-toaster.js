'use client';
import { normalizeProps } from '@zag-js/react';
import * as toast from '@zag-js/toast';

const createToaster = (props) => {
  const machine = toast.group.machine({ id: "1", ...props });
  const api = toast.group.connect(machine, machine.send, normalizeProps);
  return { ...api, machine };
};

export { createToaster };
