import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as timePicker from '@zag-js/time-picker';
export interface UseTimePickerProps extends Optional<Omit<timePicker.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {
    /**
     * The initial open state of the time picker when it is first rendered.
     * Use when you do not need to control its open state.
     */
    defaultOpen?: timePicker.Context['open'];
    /**
     * The initial value of the time picker when it is first rendered.
     * Use when you do not need to control the state of the time picker.
     */
    defaultValue?: timePicker.Context['value'];
}
export interface UseTimePickerReturn extends timePicker.Api<PropTypes> {
}
export declare const useTimePicker: (props?: UseTimePickerProps) => UseTimePickerReturn;
