function _nullishCoalesce(lhs, rhsFn) {
  if (lhs != null) {
    return lhs
  } else {
    return rhsFn()
  }
}
;('use client')

import {
  Button,
  FileUpload as ChakraFileUpload,
  Icon,
  IconButton,
  Span,
  Text,
  useFileUploadContext,
  useRecipe,
} from '@chakra-ui/react'
import { forwardRef } from 'react'
import { LuFile, LuUpload, LuX } from 'react-icons/lu'

export const FileUploadRoot = forwardRef(function FileUploadRoot(props, ref) {
  const { children, inputProps, ...rest } = props
  return (
    <ChakraFileUpload.Root {...rest}>
      <ChakraFileUpload.HiddenInput ref={ref} {...inputProps} />
      {children}
    </ChakraFileUpload.Root>
  )
})

export const FileUploadDropzone = forwardRef(
  function FileUploadDropzone(props, ref) {
    const { children, label, description, ...rest } = props
    return (
      <ChakraFileUpload.Dropzone ref={ref} {...rest}>
        <Icon fontSize='xl' color='fg.muted'>
          <LuUpload />
        </Icon>
        <ChakraFileUpload.DropzoneContent>
          <div>{label}</div>
          {description && <Text color='fg.muted'>{description}</Text>}
        </ChakraFileUpload.DropzoneContent>
        {children}
      </ChakraFileUpload.Dropzone>
    )
  },
)

const FileUploadItem = (props) => {
  const { file, showSize, clearable } = props
  return (
    <ChakraFileUpload.Item file={file}>
      <ChakraFileUpload.ItemPreview asChild>
        <Icon fontSize='lg' color='fg.muted'>
          <LuFile />
        </Icon>
      </ChakraFileUpload.ItemPreview>

      {showSize ? (
        <ChakraFileUpload.ItemContent>
          <ChakraFileUpload.ItemName />
          <ChakraFileUpload.ItemSizeText />
        </ChakraFileUpload.ItemContent>
      ) : (
        <ChakraFileUpload.ItemName flex='1' />
      )}

      {clearable && (
        <ChakraFileUpload.ItemDeleteTrigger asChild>
          <IconButton variant='ghost' color='fg.muted' size='xs'>
            <LuX />
          </IconButton>
        </ChakraFileUpload.ItemDeleteTrigger>
      )}
    </ChakraFileUpload.Item>
  )
}

export const FileUploadList = forwardRef(function FileUploadList(props, ref) {
  const { showSize, clearable, files, ...rest } = props

  const fileUpload = useFileUploadContext()
  const acceptedFiles = _nullishCoalesce(files, () => fileUpload.acceptedFiles)

  if (acceptedFiles.length === 0) return null

  return (
    <ChakraFileUpload.ItemGroup ref={ref} {...rest}>
      {acceptedFiles.map((file) => (
        <FileUploadItem
          key={file.name}
          file={file}
          showSize={showSize}
          clearable={clearable}
        />
      ))}
    </ChakraFileUpload.ItemGroup>
  )
})

export const FileInput = forwardRef(function FileInput(props, ref) {
  const inputRecipe = useRecipe({ key: 'input' })
  const [recipeProps, restProps] = inputRecipe.splitVariantProps(props)
  const { placeholder = 'Select file(s)', ...rest } = restProps
  return (
    <ChakraFileUpload.Trigger asChild>
      <Button
        unstyled
        py='0'
        ref={ref}
        {...rest}
        css={[inputRecipe(recipeProps), props.css]}
      >
        <ChakraFileUpload.Context>
          {({ acceptedFiles }) => {
            if (acceptedFiles.length === 1) {
              return <span>{acceptedFiles[0].name}</span>
            }
            if (acceptedFiles.length > 1) {
              return <span>{acceptedFiles.length} files</span>
            }
            return <Span color='fg.subtle'>{placeholder}</Span>
          }}
        </ChakraFileUpload.Context>
      </Button>
    </ChakraFileUpload.Trigger>
  )
})

export const FileUploadLabel = ChakraFileUpload.Label
export const FileUploadClearTrigger = ChakraFileUpload.ClearTrigger
export const FileUploadTrigger = ChakraFileUpload.Trigger
