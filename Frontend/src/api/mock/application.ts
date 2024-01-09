
import { mock } from './mockAdapter';

// Wichtig: Die Reihenfolge der Mocks ist wichtig, da sonst die spezifischeren Mocks nicht greifen.
// Also erst die spezifischen Mocks, dann die allgemeinen.

// GET
mock.onGet((`${import.meta.env.VITE_ENDPOINT_APPLICATION}/application-pages/`)).reply(200); // TODO return
