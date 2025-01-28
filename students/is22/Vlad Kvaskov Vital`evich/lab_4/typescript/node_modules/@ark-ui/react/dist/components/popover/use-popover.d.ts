import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as popover from '@zag-js/popover';
export interface UsePopoverProps extends Optional<Omit<popover.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {
    /**
     * The initial open state of the popover when it is first rendered.
     * Use when you do not need to control its open state.
     */
    defaultOpen?: popover.Context['open'];
}
export interface UsePopoverReturn extends popover.Api<PropTypes> {
}
export declare const usePopover: (props?: UsePopoverProps) => UsePopoverReturn;
