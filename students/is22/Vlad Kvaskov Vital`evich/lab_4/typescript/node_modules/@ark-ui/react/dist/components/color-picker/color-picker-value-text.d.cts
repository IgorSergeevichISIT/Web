import { HTMLProps, PolymorphicProps } from '../factory';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface ColorPickerValueTextBaseProps extends PolymorphicProps {
}
export interface ColorPickerValueTextProps extends HTMLProps<'span'>, ColorPickerValueTextBaseProps {
}
export declare const ColorPickerValueText: ForwardRefExoticComponent<ColorPickerValueTextProps & RefAttributes<HTMLDivElement>>;
