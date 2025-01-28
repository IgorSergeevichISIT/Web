import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as pagination from '@zag-js/pagination';
export interface UsePaginationProps extends Optional<Omit<pagination.Context, 'dir' | 'getRootNode'>, 'id'> {
    /**
     * The initial page of the pagination when it is first rendered.
     * Use when you do not need to control the state of the pagination.
     */
    defaultPage?: pagination.Context['page'];
}
export interface UsePaginationReturn extends pagination.Api<PropTypes> {
}
export declare const usePagination: (props: UsePaginationProps) => UsePaginationReturn;
