import { PropTypes } from '@zag-js/types';
import { Optional } from '../../types';
import * as editable from '@zag-js/editable';
export interface UseEditableProps extends Optional<Omit<editable.Context, 'dir' | 'getRootNode' | 'edit.controlled'>, 'id'> {
    /**
     * The initial edit state of the editable when it is first rendered.
     * Use when you do not need to control its edit state.
     */
    defaultEdit?: editable.Context['edit'];
    /**
     * The initial value of the editable when it is first rendered.
     * Use when you do not need to control the state of the editable.
     */
    defaultValue?: editable.Context['value'];
}
export interface UseEditableReturn extends editable.Api<PropTypes> {
}
export declare const useEditable: (props?: UseEditableProps) => UseEditableReturn;
