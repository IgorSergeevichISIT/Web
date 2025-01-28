'use client'

import {
  Button,
  Toggle as ChakraToggle,
  useToggleContext,
} from '@chakra-ui/react'
import { forwardRef } from 'react'

const variantMap = {
  solid: { on: 'solid', off: 'outline' },
  surface: { on: 'surface', off: 'outline' },
  subtle: { on: 'subtle', off: 'ghost' },
  ghost: { on: 'subtle', off: 'ghost' },
}

export const Toggle = forwardRef(function Toggle(props, ref) {
  const { variant = 'subtle', size, children, ...rest } = props
  const variantConfig = variantMap[variant]

  return (
    <ChakraToggle.Root asChild {...rest}>
      <ToggleBaseButton size={size} variant={variantConfig} ref={ref}>
        {children}
      </ToggleBaseButton>
    </ChakraToggle.Root>
  )
})

const ToggleBaseButton = forwardRef(function ToggleBaseButton(props, ref) {
  const toggle = useToggleContext()
  const { variant, ...rest } = props
  return (
    <Button
      variant={toggle.pressed ? variant.on : variant.off}
      ref={ref}
      {...rest}
    />
  )
})

export const ToggleIndicator = ChakraToggle.Indicator
