'use client';
import { createAnatomy } from '@zag-js/anatomy';

const toggleAnatomy = createAnatomy("toggle", ["root", "indicator"]);
const parts = toggleAnatomy.build();

export { parts, toggleAnatomy };
