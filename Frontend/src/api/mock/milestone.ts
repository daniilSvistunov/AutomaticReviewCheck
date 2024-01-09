
import { mock } from './mockAdapter';

// Wichtig: Die Reihenfolge der Mocks ist wichtig, da sonst die spezifischeren Mocks nicht greifen.
// Also erst die spezifischen Mocks, dann die allgemeinen.

// POST
mock.onPost(import.meta.env.VITE_ENDPOINT_MILESTONES).reply(200); // TODO return
mock.onPost(import.meta.env.VITE_ENDPOINT_MILESTONES_ITERATIONS).reply(200);
mock.onPost(import.meta.env.VITE_ENDPOINT_MILESTONES_FEATURES).reply(200);

// PATCH
mock.onPatch(new RegExp(`${import.meta.env.VITE_ENDPOINT_MILESTONES}/\\w+`)).reply(200);

// DELETE
mock.onDelete(new RegExp(`${import.meta.env.VITE_ENDPOINT_MILESTONES}/\\w+`)).reply(200)