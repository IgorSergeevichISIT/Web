import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as tabs from '@zag-js/tabs';
export interface UseTabsProps extends Optional<Omit<tabs.Context, 'dir' | 'getRootNode'>, 'id'> {
    /**
     * The initial value of the tabs when it is first rendered.
     * Use when you do not need to control the state of the tabs.
     */
    defaultValue?: tabs.Context['value'];
}
export interface UseTabsReturn extends tabs.Api<PropTypes> {
}
export declare const useTabs: (props?: UseTabsProps) => UseTabsReturn;
