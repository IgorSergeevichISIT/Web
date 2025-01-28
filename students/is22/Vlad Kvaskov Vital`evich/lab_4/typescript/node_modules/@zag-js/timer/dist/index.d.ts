import * as _zag_js_anatomy from '@zag-js/anatomy';
import { RequiredBy, PropTypes, CommonProperties, NormalizeProps } from '@zag-js/types';
import * as _zag_js_core from '@zag-js/core';
import { Machine, StateMachine } from '@zag-js/core';

declare const anatomy: _zag_js_anatomy.AnatomyInstance<"root" | "area" | "control" | "item" | "itemValue" | "itemLabel" | "actionTrigger" | "separator">;

interface Time<T = number> {
    days: T;
    hours: T;
    minutes: T;
    seconds: T;
    milliseconds: T;
}
type TimePart = keyof Time;
type TimerAction = "start" | "pause" | "resume" | "reset";
type ElementIds = Partial<{
    root: string;
    area: string;
}>;
interface TickDetails {
    value: number;
    time: Time;
    formattedTime: Time<string>;
}
interface PublicContext extends CommonProperties {
    /**
     * The ids of the timer parts
     */
    ids?: ElementIds;
    /**
     * Whether the timer should countdown, decrementing the timer on each tick.
     */
    countdown?: boolean;
    /**
     * The total duration of the timer in milliseconds.
     */
    startMs?: number;
    /**
     * The minimum count of the timer in milliseconds.
     */
    targetMs?: number;
    /**
     * Whether the timer should start automatically
     */
    autoStart?: boolean;
    /**
     * The interval in milliseconds to update the timer count.
     * @default 250
     */
    interval: number;
    /**
     * Function invoked when the timer ticks
     */
    onTick?: (details: TickDetails) => void;
    /**
     * Function invoked when the timer is completed
     */
    onComplete?: () => void;
}
interface PrivateContext {
}
type ComputedContext = Readonly<{
    /**
     * @computed
     * The time parts of the timer count.
     */
    time: Time;
    /**
     * @computed
     * The formatted time parts of the timer count.
     */
    formattedTime: Time<string>;
    /**
     * @computed
     * The progress percentage of the timer.
     */
    progressPercent: number;
}>;
type UserDefinedContext = RequiredBy<PublicContext, "id">;
interface MachineContext extends PublicContext, PrivateContext, ComputedContext {
}
interface MachineState {
    value: "idle" | "running" | "paused";
}
type State = StateMachine.State<MachineContext, MachineState>;
type Send = StateMachine.Send<StateMachine.AnyEventObject>;
type Service = Machine<MachineContext, MachineState, StateMachine.AnyEventObject>;
interface ItemProps {
    type: TimePart;
}
interface ActionTriggerProps {
    action: TimerAction;
}
interface MachineApi<T extends PropTypes = PropTypes> {
    /**
     * Whether the timer is running.
     */
    running: boolean;
    /**
     * Whether the timer is paused.
     */
    paused: boolean;
    /**
     * The formatted timer count value.
     */
    time: Time;
    /**
     * The formatted time parts of the timer count.
     */
    formattedTime: Time<string>;
    /**
     * Function to start the timer.
     */
    start(): void;
    /**
     * Function to pause the timer.
     */
    pause(): void;
    /**
     * Function to resume the timer.
     */
    resume(): void;
    /**
     * Function to reset the timer.
     */
    reset(): void;
    /**
     * Function to restart the timer.
     */
    restart(): void;
    /**
     * The progress percentage of the timer.
     */
    progressPercent: number;
    getRootProps(): T["element"];
    getAreaProps(): T["element"];
    getControlProps(): T["element"];
    getItemProps(props: ItemProps): T["element"];
    getItemValueProps(props: ItemProps): T["element"];
    getItemLabelProps(props: ItemProps): T["element"];
    getSeparatorProps(): T["element"];
    getActionTriggerProps(props: ActionTriggerProps): T["button"];
}

declare function connect<T extends PropTypes>(state: State, send: Send, normalize: NormalizeProps<T>): MachineApi<T>;

declare function machine(userContext: UserDefinedContext): _zag_js_core.Machine<MachineContext, MachineState, _zag_js_core.StateMachine.AnyEventObject>;

declare function parse(date: string | Partial<Time>): number;

declare const props: ("id" | "ids" | "countdown" | "startMs" | "targetMs" | "autoStart" | "interval" | "onTick" | "onComplete" | "getRootNode")[];
declare const splitProps: <Props extends Partial<UserDefinedContext>>(props: Props) => [Partial<UserDefinedContext>, Omit<Props, "id" | "ids" | "countdown" | "startMs" | "targetMs" | "autoStart" | "interval" | "onTick" | "onComplete" | "getRootNode">];

export { type ActionTriggerProps, type MachineApi as Api, type UserDefinedContext as Context, type ElementIds, type ItemProps, type MachineState, type Service, type TickDetails, type Time, type TimePart, type TimerAction, anatomy, connect, machine, parse, props, splitProps };
