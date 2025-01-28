import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as tagsInput from '@zag-js/tags-input';
export interface UseTagsInputProps extends Optional<Omit<tagsInput.Context, 'dir' | 'getRootNode'>, 'id'> {
    /**
     * The initial value of the tags input when it is first rendered.
     * Use when you do not need to control the state of the tags input.
     */
    defaultValue?: tagsInput.Context['value'];
}
export interface UseTagsInputReturn extends tagsInput.Api<PropTypes> {
}
export declare const useTagsInput: (props?: UseTagsInputProps) => UseTagsInputReturn;
