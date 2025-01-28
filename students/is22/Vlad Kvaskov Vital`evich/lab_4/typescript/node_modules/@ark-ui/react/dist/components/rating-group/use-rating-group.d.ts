import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as rating from '@zag-js/rating-group';
export interface UseRatingGroupProps extends Optional<Omit<rating.Context, 'dir' | 'getRootNode'>, 'id'> {
    /**
     * The initial value of the rating group when it is first rendered.
     * Use when you do not need to control the state of the rating group.
     */
    defaultValue?: rating.Context['value'];
}
export interface UseRatingGroupReturn extends rating.Api<PropTypes> {
}
export declare const useRatingGroup: (props?: UseRatingGroupProps) => UseRatingGroupReturn;
