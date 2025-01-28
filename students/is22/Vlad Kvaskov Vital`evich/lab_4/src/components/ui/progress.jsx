import { Progress as ChakraProgress, IconButton } from '@chakra-ui/react'
import { ToggleTip } from './toggle-tip'
import { forwardRef } from 'react'
import { HiOutlineInformationCircle } from 'react-icons/hi'

export const ProgressBar = forwardRef(function ProgressBar(props, ref) {
  return (
    <ChakraProgress.Track {...props} ref={ref}>
      <ChakraProgress.Range />
    </ChakraProgress.Track>
  )
})

export const ProgressRoot = ChakraProgress.Root
export const ProgressValueText = ChakraProgress.ValueText

export const ProgressLabel = forwardRef(function ProgressLabel(props, ref) {
  const { children, info, ...rest } = props
  return (
    <ChakraProgress.Label {...rest} ref={ref}>
      {children}
      {info && (
        <ToggleTip content={info}>
          <IconButton variant='ghost' aria-label='info' size='2xs' ms='1'>
            <HiOutlineInformationCircle />
          </IconButton>
        </ToggleTip>
      )}
    </ChakraProgress.Label>
  )
})
