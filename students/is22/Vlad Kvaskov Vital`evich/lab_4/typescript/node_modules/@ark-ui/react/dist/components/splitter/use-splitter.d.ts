import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as splitter from '@zag-js/splitter';
export interface UseSplitterProps extends Optional<Omit<splitter.Context, 'dir' | 'getRootNode'>, 'id'> {
    /**
     * The initial size of the panels when it is first rendered.
     * Use this when you do not need to control the state of the carousel.
     */
    defaultSize?: splitter.Context['size'];
}
export interface UseSplitterReturn extends splitter.Api<PropTypes> {
}
export declare const useSplitter: (props?: UseSplitterProps) => UseSplitterReturn;
