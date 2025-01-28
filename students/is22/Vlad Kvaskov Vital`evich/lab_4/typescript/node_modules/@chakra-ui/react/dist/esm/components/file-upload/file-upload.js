"use strict";
"use client";
import { jsx } from 'react/jsx-runtime';
import { FileUpload, useFileUploadContext } from '@ark-ui/react/file-upload';
import { forwardRef } from 'react';
import { createSlotRecipeContext } from '../../styled-system/create-slot-recipe-context.js';
import { chakra } from '../../styled-system/factory.js';

const {
  withProvider,
  withContext,
  useStyles: useFileUploadStyles,
  PropsProvider
} = createSlotRecipeContext({ key: "fileUpload" });
const FileUploadRootProvider = withProvider(FileUpload.RootProvider, "root", { forwardAsChild: true });
const FileUploadRoot = withProvider(
  FileUpload.Root,
  "root",
  { forwardAsChild: true }
);
const FileUploadPropsProvider = PropsProvider;
const FileUploadClearTrigger = forwardRef(function FileUploadClearTrigger2(props, ref) {
  const fileUpload = useFileUploadContext();
  return /* @__PURE__ */ jsx(
    chakra.button,
    {
      ref,
      type: "button",
      "data-scope": "file-upload",
      "data-part": "clear-trigger",
      "aria-label": "Clear selected files",
      hidden: fileUpload.acceptedFiles.length === 0,
      ...props,
      onClick: (event) => {
        props.onClick?.(event);
        if (event.defaultPrevented) return;
        fileUpload.clearFiles();
      }
    }
  );
});
const FileUploadDropzone = withContext(FileUpload.Dropzone, "dropzone", { forwardAsChild: true });
const FileUploadDropzoneContent = withContext("div", "dropzoneContent");
const FileUploadItem = withContext(
  FileUpload.Item,
  "item",
  { forwardAsChild: true }
);
const FileUploadItemContent = withContext("div", "itemContent");
const FileUploadItemDeleteTrigger = withContext(FileUpload.ItemDeleteTrigger, "itemDeleteTrigger", {
  forwardAsChild: true
});
const FileUploadItemGroup = withContext(FileUpload.ItemGroup, "itemGroup", { forwardAsChild: true });
const FileUploadItemName = withContext(FileUpload.ItemName, "itemName", { forwardAsChild: true });
const FileUploadItemPreview = withContext(FileUpload.ItemPreview, "itemPreview", { forwardAsChild: true });
const FileUploadItemPreviewImage = withContext(FileUpload.ItemPreviewImage, "itemPreviewImage", { forwardAsChild: true });
const FileUploadItemSizeText = withContext(FileUpload.ItemSizeText, "itemSizeText", { forwardAsChild: true });
const FileUploadLabel = withContext(FileUpload.Label, "label", { forwardAsChild: true });
const FileUploadTrigger = withContext(FileUpload.Trigger, "trigger", { forwardAsChild: true });
const FileUploadContext = FileUpload.Context;
const FileUploadHiddenInput = FileUpload.HiddenInput;

export { FileUploadClearTrigger, FileUploadContext, FileUploadDropzone, FileUploadDropzoneContent, FileUploadHiddenInput, FileUploadItem, FileUploadItemContent, FileUploadItemDeleteTrigger, FileUploadItemGroup, FileUploadItemName, FileUploadItemPreview, FileUploadItemPreviewImage, FileUploadItemSizeText, FileUploadLabel, FileUploadPropsProvider, FileUploadRoot, FileUploadRootProvider, FileUploadTrigger, useFileUploadStyles };
