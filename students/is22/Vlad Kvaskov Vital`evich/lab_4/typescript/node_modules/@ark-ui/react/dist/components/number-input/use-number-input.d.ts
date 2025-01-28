import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as numberInput from '@zag-js/number-input';
export interface UseNumberInputProps extends Optional<Omit<numberInput.Context, 'dir' | 'getRootNode'>, 'id'> {
    /**
     * The initial value of the number input when it is first rendered.
     * Use when you do not need to control the state of the number input.
     */
    defaultValue?: numberInput.Context['value'];
}
export interface UseNumberInputReturn extends numberInput.Api<PropTypes> {
}
export declare const useNumberInput: (props?: UseNumberInputProps) => UseNumberInputReturn;
