import { UseMenuReturn } from './use-menu';
import { Provider } from 'react';
export type UseMenuMachineContext = UseMenuReturn['machine'] | undefined;
export declare const MenuMachineProvider: Provider<UseMenuMachineContext>, useMenuMachineContext: () => UseMenuMachineContext;
