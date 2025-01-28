import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as accordion from '@zag-js/accordion';
export interface UseAccordionProps extends Optional<Omit<accordion.Context, 'dir' | 'getRootNode'>, 'id'> {
    /**
     * The initial value of the accordion when it is first rendered.
     * Use when you do not need to control the state of the accordion.
     */
    defaultValue?: accordion.Context['value'];
}
export interface UseAccordionReturn extends accordion.Api<PropTypes> {
}
export declare const useAccordion: (props?: UseAccordionProps) => UseAccordionReturn;
