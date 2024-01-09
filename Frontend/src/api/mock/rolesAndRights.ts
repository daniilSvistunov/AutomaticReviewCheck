
import { mock } from './mockAdapter';

// Wichtig: Die Reihenfolge der Mocks ist wichtig, da sonst die spezifischeren Mocks nicht greifen.
// Also erst die spezifischen Mocks, dann die allgemeinen.

// POST
mock.onPost(import.meta.env.VITE_ENDPOINT_CONSULTINGROLESORDER).reply(200); // TODO return

// PATCH
mock.onPatch(new RegExp(`${import.meta.env.VITE_ENDPOINT_CONSULTINGROLESORDER}/\\w+`)).reply(200);

// DELETE
mock.onDelete(new RegExp(`${import.meta.env.VITE_ENDPOINT_CONSULTINGROLESORDER}/\\w+`)).reply(200)