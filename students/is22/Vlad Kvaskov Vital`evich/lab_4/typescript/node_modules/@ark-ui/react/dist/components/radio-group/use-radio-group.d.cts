import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as radio from '@zag-js/radio-group';
export interface UseRadioGroupProps extends Optional<Omit<radio.Context, 'dir' | 'getRootNode'>, 'id'> {
    /**
     * The initial value of the radio group when it is first rendered.
     * Use when you do not need to control the state of the radio group.
     */
    defaultValue?: radio.Context['value'];
}
export interface UseRadioGroupReturn extends radio.Api<PropTypes> {
}
export declare const useRadioGroup: (props?: UseRadioGroupProps) => UseRadioGroupReturn;
