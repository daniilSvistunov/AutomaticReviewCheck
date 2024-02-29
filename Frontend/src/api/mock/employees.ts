
import { mockEmployees } from './data/data';
import { mock } from './mockAdapter';

// TODO: Noch nicht so richtig verstanden
// Wichtig: Die Reihenfolge der Mocks ist wichtig, da sonst die spezifischeren Mocks nicht greifen.
// Also erst die spezifischen Mocks, dann die allgemeinen.

// GET
mock.onGet((import.meta.env.VITE_ENDPOINT_EMPLOYEES)).reply(200, mockEmployees);
mock.onGet(new RegExp(`${import.meta.env.VITE_ENDPOINT_EMPLOYEES}/\\w+`)).reply(200, mockEmployees)
