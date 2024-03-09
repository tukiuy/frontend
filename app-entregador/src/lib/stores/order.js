import { writable } from "svelte/store";

/** @type {import('$lib/types/types').Order} */
const initialValue = {}

export const order = writable(initialValue);