import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as zagSwitch from '@zag-js/switch';
export interface UseSwitchProps extends Optional<Omit<zagSwitch.Context, 'dir' | 'getRootNode'>, 'id'> {
    /**
     * The checked state of the switch when it is first rendered.
     * Use this when you do not need to control the state of the switch.
     */
    defaultChecked?: zagSwitch.Context['checked'];
}
export interface UseSwitchReturn extends zagSwitch.Api<PropTypes> {
}
export declare const useSwitch: (props?: UseSwitchProps) => UseSwitchReturn;
