import { HTMLProps, PolymorphicProps } from '../factory';
import { UseClipboardProps } from './use-clipboard';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface ClipboardRootBaseProps extends UseClipboardProps, PolymorphicProps {
}
export interface ClipboardRootProps extends HTMLProps<'div'>, ClipboardRootBaseProps {
}
export declare const ClipboardRoot: ForwardRefExoticComponent<ClipboardRootProps & RefAttributes<HTMLDivElement>>;
