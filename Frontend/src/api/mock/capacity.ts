import { mockCapacities } from './data/data';
import { mock } from './mockAdapter';

// Wichtig: Die Reihenfolge der Mocks ist wichtig, da sonst die spezifischeren Mocks nicht greifen.
// Also erst die spezifischen Mocks, dann die allgemeinen.

// GET
mock.onGet(new RegExp(`${import.meta.env.VITE_ENDPOINT_CAPACITIES}/\\w+`)).reply(200, mockCapacities)
mock.onGet(import.meta.env.VITE_ENDPOINT_CAPACITIES).reply(200, mockCapacities)