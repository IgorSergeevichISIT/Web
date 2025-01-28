import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as segmentGroup from '@zag-js/radio-group';
export interface UseSegmentGroupProps extends Optional<Omit<segmentGroup.Context, 'dir' | 'getRootNode'>, 'id'> {
    /**
     * The initial value of the segment group when it is first rendered.
     * Use when you do not need to control the state of the segment group.
     */
    defaultValue?: segmentGroup.Context['value'];
}
export interface UseSegmentGroupReturn extends segmentGroup.Api<PropTypes> {
}
export declare const useSegmentGroup: (props?: UseSegmentGroupProps) => UseSegmentGroupReturn;
