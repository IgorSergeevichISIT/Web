import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as toggleGroup from '@zag-js/toggle-group';
export interface UseToggleGroupProps extends Optional<Omit<toggleGroup.Context, 'dir' | 'getRootNode'>, 'id'> {
    /**
     * The initial value of the toggle group when it is first rendered.
     * Use when you do not need to control the state of the toggle group.
     */
    defaultValue?: toggleGroup.Context['value'];
}
export interface UseToggleGroupReturn extends toggleGroup.Api<PropTypes> {
}
export declare const useToggleGroup: (props?: UseToggleGroupProps) => UseToggleGroupReturn;
