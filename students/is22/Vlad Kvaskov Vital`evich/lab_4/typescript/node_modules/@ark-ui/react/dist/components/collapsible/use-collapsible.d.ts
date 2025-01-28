import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import { RenderStrategyProps } from '../../utils/render-strategy';
import * as collapsible from '@zag-js/collapsible';
export interface UseCollapsibleProps extends Optional<Omit<collapsible.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'>, RenderStrategyProps {
    /**
     * The initial open state of the collapsible when it is first rendered.
     * Use when you do not need to control its open state.
     */
    defaultOpen?: collapsible.Context['open'];
}
export interface UseCollapsibleReturn extends collapsible.Api<PropTypes> {
    /**
     * Whether the content is unmounted
     */
    isUnmounted?: boolean;
}
export declare const useCollapsible: (props?: UseCollapsibleProps) => UseCollapsibleReturn;
