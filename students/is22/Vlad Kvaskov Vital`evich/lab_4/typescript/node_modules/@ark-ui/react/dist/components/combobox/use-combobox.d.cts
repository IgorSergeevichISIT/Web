import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import { CollectionItem, ListCollection } from '../collection';
import * as combobox from '@zag-js/combobox';
export interface UseComboboxProps<T extends CollectionItem> extends Optional<Omit<combobox.Context<T>, 'dir' | 'getRootNode' | 'collection' | 'open.controlled'>, 'id'> {
    /**
     * The initial open state of the combobox when it is first rendered.
     * Use when you do not need to control its open state.
     */
    defaultOpen?: combobox.Context['open'];
    /**
     * The initial value of the combobox when it is first rendered.
     * Use when you do not need to control the state of the combobox.
     */
    defaultValue?: combobox.Context<T>['value'];
    /**
     * The collection of items
     */
    collection: ListCollection<T>;
}
export interface UseComboboxReturn<T extends CollectionItem> extends combobox.Api<PropTypes, T> {
}
export declare const useCombobox: <T extends unknown>(props: UseComboboxProps<T>) => UseComboboxReturn<T>;
