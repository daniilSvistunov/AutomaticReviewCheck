import { mockTeamIterations } from './data/data';
import { mock } from './mockAdapter';


// Wichtig: Die Reihenfolge der Mocks ist wichtig, da sonst die spezifischeren Mocks nicht greifen.
// Also erst die spezifischen Mocks, dann die allgemeinen.

// GET
mock.onGet(`${import.meta.env.VITE_ENDPOINT_TEAMITERATIONS}`).reply(200, mockTeamIterations); 

// POST
mock.onPost(new RegExp(`${import.meta.env.VITE_ENDPOINT_TEAMITERATIONS}/\\w+`)).reply(200, mockTeamIterations);