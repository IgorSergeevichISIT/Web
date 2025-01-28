'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const anatomy = require('@zag-js/anatomy');

const toggleAnatomy = anatomy.createAnatomy("toggle", ["root", "indicator"]);
const parts = toggleAnatomy.build();

exports.parts = parts;
exports.toggleAnatomy = toggleAnatomy;
