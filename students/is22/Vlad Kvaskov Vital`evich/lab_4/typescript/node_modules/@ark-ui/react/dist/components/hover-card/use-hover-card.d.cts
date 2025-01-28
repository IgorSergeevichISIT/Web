import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as hoverCard from '@zag-js/hover-card';
export interface UseHoverCardProps extends Optional<Omit<hoverCard.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {
    /**
     * The initial open state of the hover card when it is first rendered.
     * Use when you do not need to control its open state.
     */
    defaultOpen?: hoverCard.Context['open'];
}
export interface UseHoverCardReturn extends hoverCard.Api<PropTypes> {
}
export declare const useHoverCard: (props?: UseHoverCardProps) => UseHoverCardReturn;
