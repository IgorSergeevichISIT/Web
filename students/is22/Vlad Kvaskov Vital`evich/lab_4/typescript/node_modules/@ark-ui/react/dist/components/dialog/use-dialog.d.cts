import { PropTypes } from '@zag-js/react';
import { Optional } from '../../types';
import * as dialog from '@zag-js/dialog';
export interface UseDialogProps extends Optional<Omit<dialog.Context, 'getRootNode' | 'dir' | 'open.controlled'>, 'id'> {
    /**
     * The initial open state of the dialog when it is first rendered.
     * Use when you do not need to control its open state.
     */
    defaultOpen?: dialog.Context['open'];
}
export interface UseDialogReturn extends dialog.Api<PropTypes> {
}
export declare const useDialog: (props?: UseDialogProps) => UseDialogReturn;
