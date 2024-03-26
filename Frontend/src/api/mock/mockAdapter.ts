import MockAdapter from 'axios-mock-adapter';

import axiosInstance from '../axiosInstance';

export const mock = new MockAdapter(axiosInstance, { delayResponse: 100 });