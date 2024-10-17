import {  TIMES, WORDS } from "../constants";

export type MODE = 'time' | 'words' | 'quote';
export type TIME = keyof typeof TIMES
export type WORD = keyof typeof WORDS