import { ItemProps } from '@zag-js/menu';
import { HTMLProps, PolymorphicProps } from '../factory';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface MenuItemBaseProps extends ItemProps, PolymorphicProps {
}
export interface MenuItemProps extends HTMLProps<'div'>, MenuItemBaseProps {
}
export declare const MenuItem: ForwardRefExoticComponent<MenuItemProps & RefAttributes<HTMLDivElement>>;
