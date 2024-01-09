import { mockTeamsList } from './data/data';
import { mock } from './mockAdapter';

// Wichtig: Die Reihenfolge der Mocks ist wichtig, da sonst die spezifischeren Mocks nicht greifen.
// Also erst die spezifischen Mocks, dann die allgemeinen.

// GET
mock.onGet(import.meta.env.VITE_ENDPOINT_TEAMS).reply(200, mockTeamsList);
mock.onGet(new RegExp(`${import.meta.env.VITE_ENDPOINT_TEAMS}/\\w+`)).reply(200, mockTeamsList[0])