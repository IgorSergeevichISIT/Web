import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import { CollectionItem, ListCollection } from '../collection';
import * as select from '@zag-js/select';
export interface UseSelectProps<T extends CollectionItem> extends Optional<Omit<select.Context<T>, 'dir' | 'getRootNode' | 'open.controlled' | 'collection'>, 'id'> {
    /**
     * The initial open state of the select when it is first rendered.
     * Use when you do not need to control its open state.
     */
    defaultOpen?: select.Context['open'];
    /**
     * The initial value of the select when it is first rendered.
     * Use when you do not need to control the state of the select.
     */
    defaultValue?: select.Context<T>['value'];
    /**
     * The collection of items
     */
    collection: ListCollection<T>;
}
export interface UseSelectReturn<T extends CollectionItem> extends select.Api<PropTypes, T> {
}
export declare const useSelect: <T extends unknown>(props: UseSelectProps<T>) => UseSelectReturn<T>;
