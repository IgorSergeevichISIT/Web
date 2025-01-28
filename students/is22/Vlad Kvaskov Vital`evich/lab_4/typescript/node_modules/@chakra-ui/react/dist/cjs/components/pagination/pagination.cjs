"use strict";
"use client";
'use strict';

var pagination = require('@ark-ui/react/pagination');
var createSlotRecipeContext = require('../../styled-system/create-slot-recipe-context.cjs');

const {
  withProvider,
  withContext,
  useStyles: usePaginationStyles,
  PropsProvider
} = createSlotRecipeContext.createSlotRecipeContext({ key: "pagination" });
const PaginationRootProvider = withProvider(pagination.Pagination.RootProvider, "root", {
  forwardAsChild: true,
  forwardProps: ["page"]
});
const PaginationRoot = withProvider(
  pagination.Pagination.Root,
  "root",
  { forwardAsChild: true, forwardProps: ["page"] }
);
const PaginationPropsProvider = PropsProvider;
const PaginationEllipsis = withContext(pagination.Pagination.Ellipsis, "ellipsis", { forwardAsChild: true });
const PaginationItem = withContext(pagination.Pagination.Item, "item", { forwardAsChild: true });
const PaginationNextTrigger = withContext(pagination.Pagination.NextTrigger, "nextTrigger", { forwardAsChild: true });
const PaginationPrevTrigger = withContext(pagination.Pagination.PrevTrigger, "prevTrigger", { forwardAsChild: true });
const PaginationContext = pagination.Pagination.Context;

exports.PaginationContext = PaginationContext;
exports.PaginationEllipsis = PaginationEllipsis;
exports.PaginationItem = PaginationItem;
exports.PaginationNextTrigger = PaginationNextTrigger;
exports.PaginationPrevTrigger = PaginationPrevTrigger;
exports.PaginationPropsProvider = PaginationPropsProvider;
exports.PaginationRoot = PaginationRoot;
exports.PaginationRootProvider = PaginationRootProvider;
exports.usePaginationStyles = usePaginationStyles;
