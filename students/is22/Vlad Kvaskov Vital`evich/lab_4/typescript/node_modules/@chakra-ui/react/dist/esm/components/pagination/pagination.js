"use strict";
"use client";
import { Pagination } from '@ark-ui/react/pagination';
import { createSlotRecipeContext } from '../../styled-system/create-slot-recipe-context.js';

const {
  withProvider,
  withContext,
  useStyles: usePaginationStyles,
  PropsProvider
} = createSlotRecipeContext({ key: "pagination" });
const PaginationRootProvider = withProvider(Pagination.RootProvider, "root", {
  forwardAsChild: true,
  forwardProps: ["page"]
});
const PaginationRoot = withProvider(
  Pagination.Root,
  "root",
  { forwardAsChild: true, forwardProps: ["page"] }
);
const PaginationPropsProvider = PropsProvider;
const PaginationEllipsis = withContext(Pagination.Ellipsis, "ellipsis", { forwardAsChild: true });
const PaginationItem = withContext(Pagination.Item, "item", { forwardAsChild: true });
const PaginationNextTrigger = withContext(Pagination.NextTrigger, "nextTrigger", { forwardAsChild: true });
const PaginationPrevTrigger = withContext(Pagination.PrevTrigger, "prevTrigger", { forwardAsChild: true });
const PaginationContext = Pagination.Context;

export { PaginationContext, PaginationEllipsis, PaginationItem, PaginationNextTrigger, PaginationPrevTrigger, PaginationPropsProvider, PaginationRoot, PaginationRootProvider, usePaginationStyles };
