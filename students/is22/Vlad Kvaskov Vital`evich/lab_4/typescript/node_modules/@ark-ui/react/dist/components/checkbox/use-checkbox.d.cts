import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as checkbox from '@zag-js/checkbox';
export interface UseCheckboxProps extends Optional<Omit<checkbox.Context, 'dir' | 'getRootNode'>, 'id'> {
    /**
     * The checked state of the checkbox when it is first rendered.
     * Use this when you do not need to control the state of the checkbox.
     */
    defaultChecked?: checkbox.Context['checked'];
}
export interface UseCheckboxReturn extends checkbox.Api<PropTypes> {
}
export declare const useCheckbox: (ownProps?: UseCheckboxProps) => UseCheckboxReturn;
