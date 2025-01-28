import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as steps from '@zag-js/steps';
export interface UseStepsProps extends Optional<Omit<steps.Context, 'dir' | 'getRootNode'>, 'id'> {
    /**
     * The initial value of the step
     */
    defaultStep?: number;
}
export interface UseStepsReturn extends steps.Api<PropTypes> {
}
export declare function useSteps(props?: UseStepsProps): UseStepsReturn;
