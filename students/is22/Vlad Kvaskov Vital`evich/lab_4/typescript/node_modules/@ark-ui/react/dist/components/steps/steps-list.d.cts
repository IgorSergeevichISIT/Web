import { HTMLProps, PolymorphicProps } from '../factory';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface StepsListBaseProps extends PolymorphicProps {
}
export interface StepsListProps extends HTMLProps<'ol'>, StepsListBaseProps {
}
export declare const StepsList: ForwardRefExoticComponent<StepsListProps & RefAttributes<HTMLOListElement>>;
