import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as pinInput from '@zag-js/pin-input';
export interface UsePinInputProps extends Optional<Omit<pinInput.Context, 'dir' | 'getRootNode'>, 'id'> {
    /**
     * The initial value of the pin input when it is first rendered.
     * Use when you do not need to control the state of the pin input
     */
    defaultValue?: pinInput.Context['value'];
}
export interface UsePinInputReturn extends pinInput.Api<PropTypes> {
}
export declare const usePinInput: (props?: UsePinInputProps) => UsePinInputReturn;
