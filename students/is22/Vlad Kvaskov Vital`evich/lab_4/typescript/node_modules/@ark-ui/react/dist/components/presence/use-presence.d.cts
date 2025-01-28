import { Optional } from '../../types';
import { RenderStrategyProps } from '../../utils/render-strategy';
import * as presence from '@zag-js/presence';
export interface UsePresenceProps extends Optional<presence.Context, 'present'>, RenderStrategyProps {
}
export type UsePresenceReturn = ReturnType<typeof usePresence>;
export declare const usePresence: (props: UsePresenceProps) => {
    ref: (node: HTMLElement | null) => void;
    getPresenceProps: () => {
        'data-state': string;
        hidden: boolean;
    };
    present: boolean;
    unmounted: boolean | undefined;
};
