import { HTMLProps, PolymorphicProps } from '../factory';
import { UseSplitterProps } from './use-splitter';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface SplitterRootBaseProps extends UseSplitterProps, PolymorphicProps {
}
export interface SplitterRootProps extends HTMLProps<'div'>, SplitterRootBaseProps {
}
export declare const SplitterRoot: ForwardRefExoticComponent<SplitterRootProps & RefAttributes<HTMLDivElement>>;
