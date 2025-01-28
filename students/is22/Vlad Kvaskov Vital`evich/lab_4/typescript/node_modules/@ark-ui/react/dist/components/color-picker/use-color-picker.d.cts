import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as colorPicker from '@zag-js/color-picker';
export interface UseColorPickerProps extends Optional<Omit<colorPicker.Context, 'open.controlled' | 'dir' | 'getRootNode'>, 'id'> {
    /**
     * The initial open state of the color picker when it is first rendered.
     * Use when you do not need to control its open state.
     */
    defaultOpen?: colorPicker.Context['open'];
    /**
     * The initial value of the color picker when it is first rendered.
     * Use when you do not need to control the state of the color picker.
     */
    defaultValue?: colorPicker.Context['value'];
}
export interface UseColorPickerReturn extends colorPicker.Api<PropTypes> {
}
export declare const useColorPicker: (props?: UseColorPickerProps) => UseColorPickerReturn;
