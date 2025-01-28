import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as menu from '@zag-js/menu';
export interface UseMenuProps extends Optional<Omit<menu.Context, 'open.controlled' | 'dir' | 'getRootNode'>, 'id'> {
    /**
     * The initial open state of the menu when it is first rendered.
     * Use when you do not need to control its open state.
     */
    defaultOpen?: menu.Context['open'];
}
export interface UseMenuReturn {
    machine: menu.Service;
    api: menu.Api<PropTypes>;
}
export declare const useMenu: (props?: UseMenuProps) => UseMenuReturn;
