import { mockListEntries,mockOrder1 } from './data/data';
import { mock } from './mockAdapter';


// Wichtig: Die Reihenfolge der Mocks ist wichtig, da sonst die spezifischeren Mocks nicht greifen.
// Also erst die spezifischen Mocks, dann die allgemeinen.

// GET
mock.onGet(import.meta.env.VITE_ENDPOINT_ORDER).reply(200, mockListEntries);
mock.onGet(new RegExp(`${import.meta.env.VITE_ENDPOINT_ORDER}/\\w+`))
  .reply(200, mockOrder1);
mock.onGet(new RegExp(`${import.meta.env.VITE_ENDPOINT_OPPORTUNITIES}?statecode=\\w+`));


// POST
mock.onPost(import.meta.env.VITE_ENDPOINT_ORDER).reply(200);

// PATCH
mock.onPatch(new RegExp(`${import.meta.env.VITE_ENDPOINT_ORDER}/\\w+`)).reply(200);

// DELETE
mock.onDelete(new RegExp(`${import.meta.env.VITE_ENDPOINT_ORDER}/\\w+`)).reply(200);