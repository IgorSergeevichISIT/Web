import * as _zag_js_core from '@zag-js/core';
import { StateMachine, Machine, MachineSrc } from '@zag-js/core';
export { ContextFrom, EventFrom, StateFrom, mergeProps } from '@zag-js/core';
import * as _zag_js_types from '@zag-js/types';
import { HTMLAttributes, CSSProperties, JSX, RefObject, PropsWithChildren } from 'react';

type WithoutRef<T> = Omit<T, "ref">;
type ElementsWithoutRef = {
    [K in keyof JSX.IntrinsicElements]: WithoutRef<JSX.IntrinsicElements[K]>;
};
type PropTypes = ElementsWithoutRef & {
    element: WithoutRef<HTMLAttributes<HTMLElement>>;
    style: CSSProperties;
};
declare const normalizeProps: _zag_js_types.NormalizeProps<PropTypes>;

interface PortalProps {
    disabled?: boolean;
    container?: RefObject<HTMLElement>;
    getRootNode?: () => ShadowRoot | Document | Node;
}
declare const Portal: (props: PropsWithChildren<PortalProps>) => JSX.Element;

declare function useActor<TContext extends Record<string, any>, TState extends StateMachine.StateSchema, TEvent extends StateMachine.EventObject = StateMachine.AnyEventObject>(service: Machine<TContext, TState, TEvent>): readonly [StateMachine.State<TContext, TState, TEvent>, (evt: StateMachine.Event<TEvent>) => void];

declare function useMachine<TContext extends Record<string, any>, TState extends StateMachine.StateSchema, TEvent extends StateMachine.EventObject = StateMachine.AnyEventObject>(machine: MachineSrc<TContext, TState, TEvent>, options?: StateMachine.HookOptions<TContext, TState, TEvent>): readonly [StateMachine.State<TContext, TState, TEvent>, (evt: StateMachine.Event<TEvent>) => void, _zag_js_core.Machine<TContext, TState, TEvent>];

export { Portal, type PortalProps, type PropTypes, normalizeProps, useActor, useMachine };
