import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as slider from '@zag-js/slider';
export interface UseSliderProps extends Optional<Omit<slider.Context, 'dir' | 'getRootNode'>, 'id'> {
    /**
     * The initial value of the slider when it is first rendered.
     * Use when you do not need to control the state of the slider picker.
     */
    defaultValue?: slider.Context['value'];
}
export interface UseSliderReturn extends slider.Api<PropTypes> {
}
export declare const useSlider: (props?: UseSliderProps) => UseSliderReturn;
