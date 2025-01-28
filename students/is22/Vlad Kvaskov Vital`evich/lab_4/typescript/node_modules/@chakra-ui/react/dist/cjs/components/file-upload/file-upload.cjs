"use strict";
"use client";
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var fileUpload = require('@ark-ui/react/file-upload');
var React = require('react');
var createSlotRecipeContext = require('../../styled-system/create-slot-recipe-context.cjs');
var factory = require('../../styled-system/factory.cjs');

const {
  withProvider,
  withContext,
  useStyles: useFileUploadStyles,
  PropsProvider
} = createSlotRecipeContext.createSlotRecipeContext({ key: "fileUpload" });
const FileUploadRootProvider = withProvider(fileUpload.FileUpload.RootProvider, "root", { forwardAsChild: true });
const FileUploadRoot = withProvider(
  fileUpload.FileUpload.Root,
  "root",
  { forwardAsChild: true }
);
const FileUploadPropsProvider = PropsProvider;
const FileUploadClearTrigger = React.forwardRef(function FileUploadClearTrigger2(props, ref) {
  const fileUpload$1 = fileUpload.useFileUploadContext();
  return /* @__PURE__ */ jsxRuntime.jsx(
    factory.chakra.button,
    {
      ref,
      type: "button",
      "data-scope": "file-upload",
      "data-part": "clear-trigger",
      "aria-label": "Clear selected files",
      hidden: fileUpload$1.acceptedFiles.length === 0,
      ...props,
      onClick: (event) => {
        props.onClick?.(event);
        if (event.defaultPrevented) return;
        fileUpload$1.clearFiles();
      }
    }
  );
});
const FileUploadDropzone = withContext(fileUpload.FileUpload.Dropzone, "dropzone", { forwardAsChild: true });
const FileUploadDropzoneContent = withContext("div", "dropzoneContent");
const FileUploadItem = withContext(
  fileUpload.FileUpload.Item,
  "item",
  { forwardAsChild: true }
);
const FileUploadItemContent = withContext("div", "itemContent");
const FileUploadItemDeleteTrigger = withContext(fileUpload.FileUpload.ItemDeleteTrigger, "itemDeleteTrigger", {
  forwardAsChild: true
});
const FileUploadItemGroup = withContext(fileUpload.FileUpload.ItemGroup, "itemGroup", { forwardAsChild: true });
const FileUploadItemName = withContext(fileUpload.FileUpload.ItemName, "itemName", { forwardAsChild: true });
const FileUploadItemPreview = withContext(fileUpload.FileUpload.ItemPreview, "itemPreview", { forwardAsChild: true });
const FileUploadItemPreviewImage = withContext(fileUpload.FileUpload.ItemPreviewImage, "itemPreviewImage", { forwardAsChild: true });
const FileUploadItemSizeText = withContext(fileUpload.FileUpload.ItemSizeText, "itemSizeText", { forwardAsChild: true });
const FileUploadLabel = withContext(fileUpload.FileUpload.Label, "label", { forwardAsChild: true });
const FileUploadTrigger = withContext(fileUpload.FileUpload.Trigger, "trigger", { forwardAsChild: true });
const FileUploadContext = fileUpload.FileUpload.Context;
const FileUploadHiddenInput = fileUpload.FileUpload.HiddenInput;

exports.FileUploadClearTrigger = FileUploadClearTrigger;
exports.FileUploadContext = FileUploadContext;
exports.FileUploadDropzone = FileUploadDropzone;
exports.FileUploadDropzoneContent = FileUploadDropzoneContent;
exports.FileUploadHiddenInput = FileUploadHiddenInput;
exports.FileUploadItem = FileUploadItem;
exports.FileUploadItemContent = FileUploadItemContent;
exports.FileUploadItemDeleteTrigger = FileUploadItemDeleteTrigger;
exports.FileUploadItemGroup = FileUploadItemGroup;
exports.FileUploadItemName = FileUploadItemName;
exports.FileUploadItemPreview = FileUploadItemPreview;
exports.FileUploadItemPreviewImage = FileUploadItemPreviewImage;
exports.FileUploadItemSizeText = FileUploadItemSizeText;
exports.FileUploadLabel = FileUploadLabel;
exports.FileUploadPropsProvider = FileUploadPropsProvider;
exports.FileUploadRoot = FileUploadRoot;
exports.FileUploadRootProvider = FileUploadRootProvider;
exports.FileUploadTrigger = FileUploadTrigger;
exports.useFileUploadStyles = useFileUploadStyles;
