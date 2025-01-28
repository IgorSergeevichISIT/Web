import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as tooltip from '@zag-js/tooltip';
export interface UseTooltipProps extends Optional<Omit<tooltip.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {
    /**
     * The initial open state of the tooltip when it is first rendered.
     * Use when you do not need to control its open state.
     */
    defaultOpen?: tooltip.Context['open'];
}
export interface UseTooltipReturn extends tooltip.Api<PropTypes> {
}
export declare const useTooltip: (props?: UseTooltipProps) => UseTooltipReturn;
